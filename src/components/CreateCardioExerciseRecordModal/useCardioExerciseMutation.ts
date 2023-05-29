import { useSetRecoilState } from "recoil";
import {
  DEFAULT_CARDIO_EXERCISES,
  createEditCardioExerciseRecordAtom,
} from "../../atoms/CreateEditCardioExerciseRecordAtom";
import { CardioExerciseType } from "../../types/CardioExercise";
import { CardioExercise } from "../../types/CardioExercise";

export default function useCardioExerciseMutation() {
  const setCardioExerciseRecordAtom = useSetRecoilState(
    createEditCardioExerciseRecordAtom
  );
  const onClose = () =>
    setCardioExerciseRecordAtom((atom) => ({ ...atom, modalOpened: false }));

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
  return { onClose, onChangeSelectedExerciseType };
}
