import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import Modal from "../Modal";
import RecentExerciseRecord from "./RecentExerciseRecord";
import StepCreateEditExerciseForm from "./StepCreateEditExerciseForm";
import NewSetContextProvider from "./StepCreateEditExerciseForm/NewSetContext";
import useModalOpenedMode, {
  ExerciseModalOpenMode,
} from "./useModalOpenedMode";

const getModalHeader = (openingMode: ExerciseModalOpenMode) => {
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
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const openingMode = useModalOpenedMode();
  const isViewingExercise = openingMode === ExerciseModalOpenMode.Viewing;
  const { modalOpened, exercise } = createEditRecordAtom;
  const modalHeader = getModalHeader(openingMode);
  const closeModal = useCallback(() => {
    setCreateEditRecordAtom({ ...createEditRecordAtom, modalOpened: false });
  }, [createEditRecordAtom, setCreateEditRecordAtom]);

  return (
    <Modal onClose={closeModal} opened={modalOpened} label={modalHeader}>
      {isViewingExercise ? (
        <RecentExerciseRecord exerciseName={exercise.name} />
      ) : (
        <NewSetContextProvider>
          <StepCreateEditExerciseForm />
        </NewSetContextProvider>
      )}
    </Modal>
  );
}
