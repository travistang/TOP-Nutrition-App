import {
  differenceInMonths,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subMinutes,
} from "date-fns";
import Dexie, { Table } from "dexie";
import { v4 as uuid4 } from "uuid";
import { CardioExercise, CardioExerciseType } from "../types/CardioExercise";
import { Duration } from "../types/Duration";
import {
  Exercise,
  ExerciseDetail,
  ExerciseSet,
  Repetition,
} from "../types/Exercise";
import { CreateEditType } from "../types/utils";

import {
  getTimeFromInterval,
  getTimeInInterval,
  isExerciseUnderConstraint,
  isSetFulfillChallenge,
} from "../domain/Challenges/ExerciseChallenge";
import bus, { EventBusName } from "../domain/EventBus";
import { ExerciseChallenge } from "../types/ExerciseChallenge";
import ArrayUtils from "../utils/Array";
import DatabaseUtils from "../utils/Database";
import ExerciseUtils from "../utils/Exercise";
import StringUtils from "../utils/String";

export type ExerciseSetRecord = ExerciseSet & {
  id: string;
};

export type CardioExerciseRecord = CardioExercise & {
  id: string;
};

class ExerciseDatabase extends Dexie {
  exerciseSetRecord!: Table<ExerciseSetRecord>;
  exerciseDetails!: Table<ExerciseDetail>;
  cardioExerciseRecord!: Table<CardioExerciseRecord>;
  exerciseChallenges!: Table<ExerciseChallenge>;

  constructor() {
    super("exerciseDatabase");
    this.version(1).stores({
      exerciseSetRecord: "++id,name,date",
    });

    this.version(2).stores({
      exerciseSetRecord: "++id,name,date",
      exerciseDetails: "++id,name,date",
    });

    this.version(3).stores({
      exerciseSetRecord: "++id,name,date",
      exerciseDetails: "++id,name,date",
      cardioExerciseRecord: "++id,type,date",
    });

    this.version(4).stores({
      exerciseSetRecord: "++id,name,date",
      exerciseDetails: "++id,name,date",
      cardioExerciseRecord: "++id,type,date",
      exerciseChallenges: "++id,name",
    });
  }

  exercisesOfMonth(date = Date.now()) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    return this.exerciseSetRecord
      .where("date")
      .between(monthStart.getTime(), monthEnd.getTime())
      .sortBy("date");
  }

  async recordsInRange(date: Date | number, duration: Duration) {
    return DatabaseUtils.recordsInRange(this.exerciseSetRecord, date, duration);
  }

  async searchExercise(searchString: string) {
    return this.exerciseSetRecord
      .filter((workoutSet) =>
        StringUtils.searchCaseInsensitive(
          workoutSet.exercise.name,
          searchString
        )
      )
      .toArray()
      .then((workouts) => workouts.map((workout) => workout.exercise))
      .then((exercises) =>
        ArrayUtils.distinct(exercises, ExerciseUtils.isSameExercise)
      );
  }

  exercisesOfDay(date = Date.now()) {
    return this.exerciseSetRecord
      .where("date")
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy("date");
  }

  async updateRecord(
    id: string,
    exercise: CreateEditType<Exercise>,
    rep: Repetition,
    date: Date
  ) {
    return this.exerciseSetRecord
      .update(id, {
        exercise,
        repetitions: rep,
        date: date.getTime(),
      })
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async addRecord(
    exercise: CreateEditType<Exercise>,
    rep: Repetition,
    date = new Date()
  ) {
    await this.findOrCreateExerciseDetails(exercise);
    
    const exerciseSetRecord: ExerciseSetRecord = {
      id: uuid4(),
      date: date.getTime(),
      exercise,
      repetitions: rep,
    };

    return this.exerciseSetRecord
      .add(exerciseSetRecord)
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async deleteRecord(id: string) {
    return this.exerciseSetRecord
      .delete(id)
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async findExerciseDetails(record: Exercise): Promise<ExerciseDetail | undefined> {
    return this.exerciseDetails
      .where("name")
      .equals(record.name)
      .first();
  }
  async findOrCreateExerciseDetails(record: Exercise): Promise<ExerciseDetail> {
    const matchedDetail = await this.findExerciseDetails(record);
    if (matchedDetail) return matchedDetail;

    const id = uuid4();
    const newDetails: ExerciseDetail = {
      ...record,
      id,
    };
    await this.exerciseDetails.add({
      ...record,
      id,
    });

    return newDetails;
  }

  async updateExerciseDetails(details: ExerciseDetail): Promise<void> {
    await this.exerciseDetails.update(details.id, details);
  }

  async recentExercises() {
    const timeConstraint = subMinutes(Date.now(), 10);
    const recentRecords = await this.exerciseSetRecord
      .where("date")
      .aboveOrEqual(timeConstraint.getTime())
      .toArray();
    const recentExercises = recentRecords.map((record) => record.exercise);
    return ArrayUtils.distinct(recentExercises, ExerciseUtils.isSameExercise);
  }

  async getRecentExercisesTrendData(
    exerciseName: string
  ): Promise<ExerciseSetRecord[]> {
    const now = Date.now();
    return this.exerciseSetRecord
      .filter((record) => {
        return (
          StringUtils.caseInsensitiveEqual(
            record.exercise.name,
            exerciseName
          ) && differenceInMonths(now, record.date) <= 6
        );
      })
      .toArray();
  }

  async addCardioRecord(exercise: CardioExercise) {
    const record: CardioExerciseRecord = {
      id: uuid4(),
      ...exercise,
    };
    return this.cardioExerciseRecord
      .add(record)
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async updateCardioRecord(id: string, data: CardioExercise) {
    return this.cardioExerciseRecord
      .update(id, data)
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async removeCardioRecord(id: string) {
    return this.cardioExerciseRecord
      .delete(id)
      .then(() => bus.emit(EventBusName.Workouts));
  }

  async getCardioExerciseRecords(
    dateRange: [number, number],
    type?: CardioExerciseType
  ) {
    const [start, end] = dateRange;
    return this.cardioExerciseRecord
      .filter((record) => {
        const typeMatches = !type || type === record.type;
        return record.date >= start && record.date <= end && typeMatches;
      })
      .toArray();
  }

  async createExerciseChallenge(data: Omit<ExerciseChallenge, "id">) {
    return this.exerciseChallenges.add({
      ...data,
      id: uuid4(),
    });
  }

  async removeExerciseChallenge(id: string) {
    return this.exerciseChallenges.delete(id);
  }

  async getChallengesByExercise(exercise: Exercise) {
    return this.exerciseChallenges
      .filter((c) => {
        const modifiedExerciseByConstraint: Exercise = {
          ...exercise,
          exerciseMode: c.exerciseConstraint.modes[0] ?? exercise.exerciseMode,
          equipment: c.exerciseConstraint.equipments[0] ?? exercise.equipment,
        };
        return isExerciseUnderConstraint(
          modifiedExerciseByConstraint,
          c.exerciseConstraint
        );
      })
      .toArray();
  }

  async getAllExerciseChallenges() {
    return this.exerciseChallenges.toArray();
  }

  async updateExerciseChallenge(
    id: string,
    data: Omit<ExerciseChallenge, "id">
  ) {
    return this.exerciseChallenges.update(id, data);
  }

  async getWorkoutsForChallenge(challenge: ExerciseChallenge, time: number) {
    const [start, end] = getTimeFromInterval(challenge.interval, time);
    return this.exerciseSetRecord
      .filter(
        (record) =>
          isSetFulfillChallenge(record, challenge) &&
          start <= record.date &&
          record.date <= end
      )
      .toArray();
  }

  async getPreviousSectionsForChallenge(
    challenge: ExerciseChallenge,
    time: number,
    numSections: number
  ) {
    const timeInIntervals = getTimeInInterval(
      challenge.interval,
      time,
      numSections
    );
    return Promise.all(
      timeInIntervals.map((time) =>
        this.getWorkoutsForChallenge(challenge, time)
      )
    );
  }

  async getChallengeById(id: string): Promise<ExerciseChallenge | undefined> {
    return this.exerciseChallenges.get(id);
  }
}

const exerciseDatabase = new ExerciseDatabase();
export default exerciseDatabase;
