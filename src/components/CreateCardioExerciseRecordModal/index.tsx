import React from "react";
import { useRecoilValue } from "recoil";
import Modal from "../Modal";
import { createEditCardioExerciseRecordAtom } from "../../atoms/CreateEditCardioExerciseRecordAtom";
import useCardioExerciseMutation from "./useCardioExerciseMutation";
import CardioExerciseTypePicker from "./CardioExerciseTypePicker";

export default function CreateCardioExerciseRecordModal() {
  const createCardioExerciseRecord = useRecoilValue(
    createEditCardioExerciseRecordAtom
  );
  const { onClose, onChangeSelectedExerciseType } = useCardioExerciseMutation();

  const { modalOpened, id, exercise } = createCardioExerciseRecord;
  const isEditing = !!id;

  const modalLabel = isEditing
    ? "Editing cardio exercise record"
    : "Record cardio exercise";

  return (
    <Modal onClose={onClose} opened={modalOpened} label={modalLabel}>
      <CardioExerciseTypePicker
        selectedType={exercise.type}
        onSelect={onChangeSelectedExerciseType}
      />
    </Modal>
  );
}
