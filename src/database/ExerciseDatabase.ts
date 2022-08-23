import { uuid4 } from "@sentry/utils";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import Dexie, { Table } from "dexie";
import { Exercise, ExerciseSet, Repetition } from "../types/Exercise";
import { CreateEditType } from "../types/utils";
import ExerciseUtils from "../utils/Exercise";
import ArrayUtils from "../utils/Array";

export type ExerciseSetRecord = ExerciseSet & {
  id: string;
};

class ExerciseDatabase extends Dexie {
  exerciseSetRecord!: Table<ExerciseSetRecord>;

  constructor() {
    super("exerciseDatabase");
    this.version(1).stores({
      exerciseSetRecord: "++id,name,date",
    });
  }

  exercisesOfMonth(date = Date.now()) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    return this.exerciseSetRecord
      .where('date')
      .between(monthStart.getTime(), monthEnd.getTime())
      .sortBy('date');

  }

  async searchExercise(searchString: string) {
    return this.exerciseSetRecord
      .filter(workoutSet => workoutSet.exercise.name.toLowerCase().includes(searchString.toLowerCase()))
      .toArray()
      .then(workoutWithMatchingExercise => workoutWithMatchingExercise.map(workout => workout.exercise))
      .then(exercises => ArrayUtils.distinct(exercises, (a, b) => a.name === b.name));
  }

  exercisesOfDay(date = Date.now()) {
    return this.exerciseSetRecord
      .where("date")
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy("date");
  }

  async previousExercises() {
    const exercises = (await this.exerciseSetRecord.toArray()).map(
      (set) => set.exercise
    );
    return exercises.reduce<Exercise[]>(
      (distinctExercises, exercise) =>
        distinctExercises.find((ex) =>
          ExerciseUtils.isSameExercise(ex, exercise)
        )
          ? distinctExercises
          : [...distinctExercises, exercise],
      []
    );
  }

  async updateRecord(
    id: string,
    exercise: CreateEditType<Exercise>,
    rep: Repetition,
    date: Date,
  ) {
    return this.exerciseSetRecord.update(id, {
      exercise,
      repetitions: rep,
      date: date.getTime()
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

  async deleteRecord(
    id: string
  ) {
    return this.exerciseSetRecord.delete(id);
  }
}

export default new ExerciseDatabase();
