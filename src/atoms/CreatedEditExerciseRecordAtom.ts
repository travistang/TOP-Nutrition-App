import { atom } from "recoil";
import { DEFAULT_EXERCISE, DEFAULT_REPETITION, Exercise, Repetition } from "../types/Exercise";
import { CreateEditType } from "../types/utils";

export type CreateEditExerciseRecordProps = {
  exercise: CreateEditType<Exercise>;
  repetition: Repetition;
  modalOpened: boolean;
};

export const createEditExerciseRecordAtom = atom<CreateEditExerciseRecordProps>({
  key: "createEditRecord",
  default: {
    modalOpened: false,
    exercise: DEFAULT_EXERCISE,
    repetition: DEFAULT_REPETITION,
  },
});
