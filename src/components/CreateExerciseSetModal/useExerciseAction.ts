import toast from "react-hot-toast";
import RepetitionUtils from "../../utils/Repetition";
import ExerciseUtils from "../../utils/Exercise";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
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
  const { id, exercise, repetition, date } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetition) && ExerciseUtils.isValid(exercise);

  const resetCreateEditRecordAtom = () =>
    setCreateEditRecordAtom({
      modalOpened: false,
      id: undefined,
      exercise,
      repetition: DEFAULT_REPETITION,
      date: new Date(),
    });

  const onEdit = actionWithToastFeedback(
    async () => {
      await ExerciseDatabase.updateRecord(id!, exercise, repetition, date);
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
      await ExerciseDatabase.addRecord(exercise, repetition, date);
      resetCreateEditRecordAtom();
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

  return { onEdit, onCreate, onDelete };
}
