import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Modal from "../Modal";
import useCardioExerciseMutation, {
  createEditCardioExerciseRecordAtom,
} from "../../atoms/CreateEditCardioExerciseRecordAtom";
import CardioExerciseTypePicker from "./CardioExerciseTypePicker";
import CardioExerciseDetailForms from "./CardioExerciseDetailForms";
import ButtonGroup from "./ButtonGroup";
import { isValid } from "../../domain/CardioExercise";

export default function CreateCardioExerciseRecordModal() {
  const [selectingExerciseType, setSelectingExerciseType] = useState(true);
  const createCardioExerciseRecord = useRecoilValue(
    createEditCardioExerciseRecordAtom
  );
  const {
    onUpdateRecord,
    onAddRecord,
    onDeleteRecord,
    onClose,
    onChangeSelectedExerciseType,
    onUpdateExerciseDetails,
  } = useCardioExerciseMutation();

  const { modalOpened, id, exercise } = createCardioExerciseRecord;
  const isEditing = !!id;

  const modalLabel = isEditing
    ? "Edit cardio exercise record"
    : "Record cardio exercise";

  const isFormValid = isValid(exercise);
  const onCloseWithFlagReset = () => {
    setSelectingExerciseType(true);
    onClose();
  };
  const onSave = async () => {
    if (!isFormValid) return;
    const updateFunc = () =>
      isEditing ? onUpdateRecord({ id, ...exercise }) : onAddRecord(exercise);
    const updated = await updateFunc();
    if (updated) {
      setSelectingExerciseType(true);
    }
  };

  const onDelete = async () => {
    if (!id) return;
    onDeleteRecord({ id, ...exercise });
  };

  return (
    <Modal
      onClose={onCloseWithFlagReset}
      opened={modalOpened}
      label={modalLabel}
    >
      <div className="flex flex-col items-stretch gap-2">
        {selectingExerciseType && !isEditing ? (
          <CardioExerciseTypePicker
            selectedType={exercise.type}
            onSelect={onChangeSelectedExerciseType}
          />
        ) : (
          <CardioExerciseDetailForms
            record={exercise}
            onChange={onUpdateExerciseDetails}
            onDelete={isEditing ? onDelete : undefined}
          />
        )}
        <ButtonGroup
          isEditing={isEditing}
          selectingExerciseType={selectingExerciseType}
          onSelectExerciseType={setSelectingExerciseType}
          onSave={onSave}
          canSave={isFormValid}
        />
      </div>
    </Modal>
  );
}
