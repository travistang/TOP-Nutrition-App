import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import Modal from "../Modal";
import useModalOpenedMode, {
  ExerciseModalOpenMode,
} from "./useModalOpenedMode";
import RecentExerciseRecord from "./RecentExerciseRecord";
import StepCreateEditExerciseForm from "./StepCreateEditExerciseForm";
import { featureToggleAtom } from "../../atoms/FeatureToggleAtom";
import CreateEditExerciseForm from "./CreateEditExerciseForm";

const getModalHeader = (
  openingMode: ExerciseModalOpenMode,
) => {
  switch (openingMode) {
    case ExerciseModalOpenMode.Adding:
      return "Add new workout set";
    case ExerciseModalOpenMode.Editing:
      return "Editing workout";
    case ExerciseModalOpenMode.Viewing:
      return "Recent records of";
  }
};

export default function CreateExerciseSetModal() {
  const featureToggle = useRecoilValue(featureToggleAtom);
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const openingMode = useModalOpenedMode();
  const isViewingExercise = openingMode === ExerciseModalOpenMode.Viewing;
  const { modalOpened, exercise } = createEditRecordAtom;
  const modalHeader = getModalHeader(openingMode);
  const closeModal = () => {
    setCreateEditRecordAtom({ ...createEditRecordAtom, modalOpened: false });
  };

  const Form = featureToggle.stepExerciseWorkoutForm ? CreateEditExerciseForm : StepCreateEditExerciseForm;
  return (
    <Modal onClose={closeModal} opened={modalOpened} label={modalHeader}>
      {isViewingExercise ? (
        <RecentExerciseRecord exerciseName={exercise.name} />
      ) : (
        <Form />
      )}
    </Modal>
  );
}
