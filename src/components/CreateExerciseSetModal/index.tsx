import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import Modal from "../Modal";
import ExerciseFieldSelectInput from "./ExerciseFieldSelectInput";
import WorkingBodyPartInput from "./WorkingBodyPartInput";
import RepetitionForm from "./RepetitionForm";
import RepetitionUtils from "../../utils/Repetition";
import ExerciseUtils from "../../utils/Exercise";
import Button, { ButtonStyle } from "../Input/Button";
import useExerciseAction from "./useExerciseAction";
import DateInput, { DateInputType } from "../Input/DateInput";
import ExerciseNameInput from "./ExerciseNameInput";

export default function CreateExerciseSetModal() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { id, modalOpened, exercise, repetitions, date } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetitions) && ExerciseUtils.isValid(exercise);
  const isEditing = !!id;

  const { onCreate, onDelete, onEdit, reset } = useExerciseAction();

  const updateDate = (date: Date) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      date,
    }));
  };

  const closeModal = () => {
    setCreateEditRecordAtom({ ...createEditRecordAtom, modalOpened: false });
  };

  return (
    <Modal
      onClose={closeModal}
      opened={modalOpened}
      label="Add new workout set"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-6 gap-y-4 gap-x-2 p-2"
      >
        <ExerciseNameInput className="col-span-4" />
        <ExerciseFieldSelectInput
          label="Equipment"
          field="equipment"
          className="col-span-2"
        />
        <ExerciseFieldSelectInput
          label="Exercise Mode"
          field="exerciseMode"
          className="col-span-3"
        />
        <DateInput
          dateType={DateInputType.DateTime}
          label="Date"
          value={date}
          onChange={updateDate}
          className="col-span-3"
        />
        <WorkingBodyPartInput />
        <RepetitionForm />
        <div className="col-span-full bg-gray-200 sticky bottom-0 py-2 flex items-center justify-between">
          {isEditing ? (
            <Button
              className="rounded-lg h-12 w-16 bg-transparent"
              textClassName="text-red-500"
              text="Delete"
              buttonStyle={ButtonStyle.Clear}
              onClick={onDelete}
            />
          ) : (
              <Button
                className="h-12 w-16"
                text="Reset"
                buttonStyle={ButtonStyle.Clear}
                onClick={reset}
              />
          )}
          <Button
            className="rounded-lg h-12 w-16 self-end"
            disabled={!isFormValid}
            text="Record"
            onClick={isEditing ? onEdit : onCreate}
          />
        </div>
      </form>
    </Modal>
  );
}
