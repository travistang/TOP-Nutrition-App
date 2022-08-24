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
  modalOpened: boolean;
};

export const createEditExerciseRecordAtom = atom<CreateEditExerciseRecordProps>(
  {
    key: "createEditExerciseRecord",
    default: {
      modalOpened: false,
      date: new Date(),
      exercise: DEFAULT_EXERCISE,
      repetitions: DEFAULT_REPETITION,
    },
  }
);
