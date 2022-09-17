import { atom } from "recoil";
import {
  DEFAULT_EXERCISE,
  DEFAULT_REPETITION,
  Exercise,
  Repetition,
} from "../types/Exercise";
import { CreateEditType } from "../types/utils";

export type CreateEditExerciseRecordProps = {
  exercise: CreateEditType<Exercise>;
  repetitions: Repetition;
  date: Date;
  id?: string;
  readonly: boolean;
  modalOpened: boolean;
};

export const DEFAULT_EXERCISE_RECORD = {
  modalOpened: false,
  date: new Date(),
  readonly: false,
  exercise: DEFAULT_EXERCISE,
  repetitions: DEFAULT_REPETITION,
};

export const createEditExerciseRecordAtom = atom<CreateEditExerciseRecordProps>(
  {
    key: "createEditExerciseRecord",
    default: DEFAULT_EXERCISE_RECORD,
  }
);
