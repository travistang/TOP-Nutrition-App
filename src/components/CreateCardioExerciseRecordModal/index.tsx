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
    const updated = await new Promise<boolean>(async (resolve) => {
      if (isEditing) {
        resolve(await onUpdateRecord({ id, ...exercise }));
      } else {
        resolve(await onAddRecord(exercise));
      }
    });
    if (updated) {
      setSelectingExerciseType(true);
    }
  };

  return (
    <Modal
      onClose={onCloseWithFlagReset}
      opened={modalOpened}
      label={modalLabel}
    >
      <div className="flex flex-col items-stretch gap-2">
        {selectingExerciseType ? (
          <CardioExerciseTypePicker
            selectedType={exercise.type}
            onSelect={onChangeSelectedExerciseType}
          />
        ) : (
          <CardioExerciseDetailForms
            record={exercise}
            onChange={onUpdateExerciseDetails}
          />
        )}
        <ButtonGroup
          selectingExerciseType={selectingExerciseType}
          onSelectExerciseType={setSelectingExerciseType}
          onSave={onSave}
          canSave={isFormValid}
        />
      </div>
    </Modal>
  );
}
