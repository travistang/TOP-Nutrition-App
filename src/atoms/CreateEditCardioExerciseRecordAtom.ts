import { atom } from "recoil";
import { CreateEditType } from "../types/utils";
import {
  BoulderingExerciseRecord,
  CardioExercise,
  CardioExerciseType,
  HikingExerciseRecord,
  RunningExerciseRecord,
} from "../types/CardioExercise";

export type CreateEditCardioExerciseRecordProps = {
  exercise: CreateEditType<CardioExercise>;
  id?: string;
  modalOpened: boolean;
};

const DEFAULT_RUNNING_EXERCISE_RECORD: RunningExerciseRecord = {
  type: CardioExerciseType.Running,
  date: Date.now(),
  durationMinutes: 0,
  distanceKm: 0,
  remark: "",
};

const DEFAULT_HIKING_EXERCISE_RECORD: HikingExerciseRecord = {
  type: CardioExerciseType.Hiking,
  date: Date.now(),
  durationMinutes: 0,
  remark: "",
  elevation: 0,
  tripName: "",
};

const DEFAULT_BOULDERING_EXERCISE_RECORD: BoulderingExerciseRecord = {
  type: CardioExerciseType.Bouldering,
  date: Date.now(),
  durationMinutes: 0,
  remark: "",
};

export const DEFAULT_CARDIO_EXERCISES: Record<
  CardioExerciseType,
  CardioExercise
> = {
  [CardioExerciseType.Running]: DEFAULT_RUNNING_EXERCISE_RECORD,
  [CardioExerciseType.Hiking]: DEFAULT_HIKING_EXERCISE_RECORD,
  [CardioExerciseType.Bouldering]: DEFAULT_BOULDERING_EXERCISE_RECORD,
};

export const DEFAULT_CARDIO_EXERCISE_RECORD: CreateEditCardioExerciseRecordProps =
  {
    modalOpened: false,
    exercise: DEFAULT_RUNNING_EXERCISE_RECORD,
  };

export const createEditCardioExerciseRecordAtom =
  atom<CreateEditCardioExerciseRecordProps>({
    key: "createEditCardioExerciseRecord",
    default: DEFAULT_CARDIO_EXERCISE_RECORD,
  });
