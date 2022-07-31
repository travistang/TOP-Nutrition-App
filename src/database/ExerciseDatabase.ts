import { uuid4 } from "@sentry/utils";
import { endOfDay, startOfDay } from "date-fns";
import Dexie, { Table } from "dexie";
import { Exercise, ExerciseSet, Repetition } from "../types/Exercise";
import { CreateEditType } from "../types/utils";

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

  exercisesOfDay(date = Date.now()) {
    return this.exerciseSetRecord
      .where("date")
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy("date");
  }

  async addRecord(
    exercise: CreateEditType<Exercise>,
    rep: Repetition,
    date = new Date()
  ) {
    const exerciseSetRecord: ExerciseSetRecord = {
      id: uuid4(),
      date: new Date(),
      exercise,
      repetitions: rep,
    };

    return this.exerciseSetRecord.add(exerciseSetRecord);
  }
}

export default new ExerciseDatabase();
