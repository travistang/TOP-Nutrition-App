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

import { isExerciseUnderConstraint } from "../domain/Challenges/exerciseChallenge";
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
    return this.exerciseSetRecord.update(id, {
      exercise,
      repetitions: rep,
      date: date.getTime(),
    });
  }

  async addRecord(
    exercise: CreateEditType<Exercise>,
    rep: Repetition,
    date = new Date()
  ) {
    const exerciseSetRecord: ExerciseSetRecord = {
      id: uuid4(),
      date: date.getTime(),
      exercise,
      repetitions: rep,
    };

    return this.exerciseSetRecord.add(exerciseSetRecord);
  }

  async deleteRecord(id: string) {
    return this.exerciseSetRecord.delete(id);
  }

  async findOrCreateExerciseDetails(record: Exercise): Promise<ExerciseDetail> {
    const matchedDetail = await this.exerciseDetails
      .where("name")
      .equals(record.name)
      .first();
    if (matchedDetail) return matchedDetail;

    const newDetails: ExerciseDetail = {
      ...record,
      id: uuid4(),
    };
    await this.exerciseDetails.add({
      ...record,
      id: uuid4(),
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
    return this.cardioExerciseRecord.add(record);
  }

  async updateCardioRecord(id: string, data: CardioExercise) {
    return this.cardioExerciseRecord.update(id, data);
  }

  async removeCardioRecord(id: string) {
    return this.cardioExerciseRecord.delete(id);
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
      .filter((c) => isExerciseUnderConstraint(exercise, c.exerciseConstraint))
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
}

export default new ExerciseDatabase();
