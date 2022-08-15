import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { Exercise } from "../../types/Exercise";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import ExerciseFieldSelectInput from "./ExerciseFieldSelectInput";
import WorkingBodyPartInput from "./WorkingBodyPartInput";
import RepetitionForm from "./RepetitionForm";
import RepetitionUtils from "../../utils/Repetition";
import ExerciseUtils from "../../utils/Exercise";
import DateUtils from "../../utils/Date";
import Button from "../Input/Button";
import useExerciseAction from "./useExerciseAction";

export default function CreateExerciseSetModal() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { id, modalOpened, exercise, repetition, date } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetition) && ExerciseUtils.isValid(exercise);
  const isEditing = !!id;

  const { onCreate, onDelete, onEdit } = useExerciseAction();

  const setExerciseData = (field: keyof Exercise) => (value: any) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      exercise: { ...exercise, [field]: value },
    }));
  };

  const updateDate = (dateString: string) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      date: new Date(DateUtils.stringToDate(dateString)),
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
        <TextInput
          label="Exercise name"
          value={exercise.name}
          className="col-span-4"
          onChange={setExerciseData("name")}
        />
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
        <TextInput
          type="datetime-local"
          label="Date"
          value={DateUtils.toInputFormat(date)}
          onChange={updateDate}
          className="col-span-3"
        />
        <WorkingBodyPartInput />
        <RepetitionForm />
        <div className="col-span-full bg-blue-500 sticky bottom-0 py-2 flex items-center justify-between">
          {
            isEditing && (
              <Button
                className="rounded-lg h-12 w-16 bg-transparent"
                textClassName="text-red-500"
                text="Delete"
                onClick={onDelete}
              />
            )
          }
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
