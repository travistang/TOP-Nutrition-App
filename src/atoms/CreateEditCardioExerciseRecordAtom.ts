import { atom, useSetRecoilState } from "recoil";
import { CreateEditType } from "../types/utils";
import {
  BoulderingExerciseRecord,
  CardioExercise,
  CardioExerciseType,
  HikingExerciseRecord,
  RunningExerciseRecord,
} from "../types/CardioExercise";
import ExerciseDatabase, {
  CardioExerciseRecord,
} from "../database/ExerciseDatabase";
import toast from "react-hot-toast";

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
  distanceKm: 0,
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

export default function useCardioExerciseMutation() {
  const setCardioExerciseRecordAtom = useSetRecoilState(
    createEditCardioExerciseRecordAtom
  );
  const onClose = () =>
    setCardioExerciseRecordAtom((atom) => ({ ...atom, modalOpened: false }));

  const onOpen = () => {
    setCardioExerciseRecordAtom({
      ...DEFAULT_CARDIO_EXERCISE_RECORD,
      modalOpened: true,
    });
  };

  const onAddRecord = async (exercise: CardioExercise) => {
    try {
      await ExerciseDatabase.addCardioRecord(exercise);
      toast.success("Cardio record added");
      onClose();
      return true;
    } catch {
      toast.error("Failed to add cardio record");
      return false;
    }
  };

  const onUpdateRecord = async (exercise: CardioExerciseRecord) => {
    try {
      const { id, ...record } = exercise;
      await ExerciseDatabase.updateCardioRecord(id, record);
      toast.success("Cardio record updated");
      onClose();
      return true;
    } catch {
      toast.error("Failed to update cardio record");
      return false;
    }
  };

  const onDeleteRecord = async (exercise: CardioExerciseRecord) => {
    try {
      const { id } = exercise;
      await ExerciseDatabase.removeCardioRecord(id);
      toast.success("Cardio record removed");
      onClose();
      return true;
    } catch {
      toast.error("Failed to remove cardio record");
      return false;
    }
  };

  const onEdit = (exercise: CardioExerciseRecord) => {
    setCardioExerciseRecordAtom({
      exercise,
      id: exercise.id,
      modalOpened: true,
    });
  };
  const onChangeSelectedExerciseType = (type: CardioExerciseType) => {
    const newDefaultExercise: CardioExercise = {
      ...DEFAULT_CARDIO_EXERCISES[type],
      date: Date.now(),
    };
    setCardioExerciseRecordAtom((atom) => ({
      ...atom,
      exercise: newDefaultExercise,
    }));
  };

  const onUpdateExerciseDetails = (record: CardioExercise) => {
    setCardioExerciseRecordAtom((atom) => ({
      ...atom,
      exercise: record,
    }));
  };
  return {
    onOpen,
    onAddRecord,
    onUpdateRecord,
    onDeleteRecord,
    onEdit,
    onClose,
    onChangeSelectedExerciseType,
    onUpdateExerciseDetails,
  };
}
