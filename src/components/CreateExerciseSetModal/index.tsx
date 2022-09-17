import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import Modal from "../Modal";
import useModalOpenedMode, {
  ExerciseModalOpenMode,
} from "./useModalOpenedMode";
import CreateEditExerciseForm from "./CreateEditExerciseForm";
import { Exercise } from "../../types/Exercise";
import PreviousWorkoutList from "./PreviousWorkoutList";
import RecentExerciseRecord from "./RecentExerciseRecord";

const getModalHeader = (
  openingMode: ExerciseModalOpenMode,
  exercise: Exercise
) => {
  switch (openingMode) {
    case ExerciseModalOpenMode.Adding:
      return "Add new workout set";
    case ExerciseModalOpenMode.Editing:
      return "Editing workout";
    case ExerciseModalOpenMode.Viewing:
      return `Recent records of ${exercise.name}`;
  }
};

export default function CreateExerciseSetModal() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const openingMode = useModalOpenedMode();
  const isViewingExercise = openingMode === ExerciseModalOpenMode.Viewing;
  const { modalOpened, exercise } = createEditRecordAtom;
  const modalHeader = getModalHeader(openingMode, exercise);
  const closeModal = () => {
    setCreateEditRecordAtom({ ...createEditRecordAtom, modalOpened: false });
  };

  return (
    <Modal onClose={closeModal} opened={modalOpened} label={modalHeader}>
      {isViewingExercise ? (
        <RecentExerciseRecord exerciseName={exercise.name} />
      ) : (
        <CreateEditExerciseForm />
      )}
    </Modal>
  );
}
