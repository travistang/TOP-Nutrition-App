import toast from "react-hot-toast";
import RepetitionUtils from "../../utils/Repetition";
import ExerciseUtils from "../../utils/Exercise";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom, DEFAULT_EXERCISE_RECORD } from "../../atoms/CreateEditExerciseRecordAtom";
import { DEFAULT_REPETITION } from "../../types/Exercise";
import ExerciseDatabase from "../../database/ExerciseDatabase";

const actionWithToastFeedback =
  (
    action: () => Promise<void>,
    {
      ignoreCondition,
      successMessage,
      errorMessage,
    }: {
      ignoreCondition: () => boolean;
      successMessage: string;
      errorMessage: string;
    }
  ) =>
  async () => {
    if (ignoreCondition()) return;
    try {
      await action();
      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    }
  };

export default function useExerciseAction() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { id, exercise, repetitions, date, modalOpened } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetitions) && ExerciseUtils.isValid(exercise);

  const resetCreateEditRecordAtom = (keepRepetitions = false) =>
    setCreateEditRecordAtom({
      modalOpened: false,
      id: undefined,
      exercise,
      repetitions: keepRepetitions ? repetitions : DEFAULT_REPETITION,
      date: new Date(),
    });

  const onEdit = actionWithToastFeedback(
    async () => {
      await ExerciseDatabase.updateRecord(id!, exercise, repetitions, date);
      resetCreateEditRecordAtom();
    },
    {
      ignoreCondition: () => !isFormValid || !id,
      successMessage: "Exercise Updated",
      errorMessage: "Failed to update exercise record",
    }
  );

  const onCreate = actionWithToastFeedback(
    async () => {
      await ExerciseDatabase.addRecord(exercise, repetitions, date);
      resetCreateEditRecordAtom(true);
    },
    {
      ignoreCondition: () => !isFormValid,
      successMessage: "Exercise Recorded",
      errorMessage: "Failed to save exercise record",
    }
  );

  const onDelete = actionWithToastFeedback(
    async () => {
      await ExerciseDatabase.deleteRecord(id!);
      resetCreateEditRecordAtom();
    },
    {
      ignoreCondition: () => !id,
      successMessage: "Record deleted",
      errorMessage: "Failed to delete exercise record",
    }
  );

  const reset = () => {
    setCreateEditRecordAtom({
      ...DEFAULT_EXERCISE_RECORD,
      date: new Date(),
      modalOpened,
    });
  }
  return {
    onEdit,
    onCreate,
    onDelete,
    reset,
  };
}
