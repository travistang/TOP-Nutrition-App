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
import Button, { ButtonStyle } from "../Input/Button";
import useExerciseAction from "./useExerciseAction";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import ExerciseAutocompleteResult from "../Input/ExerciseAutocompleteResult";
import DateInput, { DateInputType } from "../Input/DateInput";

export default function CreateExerciseSetModal() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { id, modalOpened, exercise, repetitions, date } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetitions) && ExerciseUtils.isValid(exercise);
  const isEditing = !!id;

  const { onCreate, onDelete, onEdit } = useExerciseAction();

  const setExerciseData = (field: keyof Exercise) => (value: any) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      exercise: { ...exercise, [field]: value },
    }));
  };

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
        <AutoCompleteInput
          label="Exercise name"
          value={exercise.name}
          onSearch={(searchString) =>
            ExerciseDatabase.searchExercise(searchString)
          }
          renderResult={(exercise: Exercise) => (
            <ExerciseAutocompleteResult exercise={exercise} />
          )}
          onSelectSearchResult={(exercise: Exercise) =>
            setCreateEditRecordAtom((record) => ({ ...record, exercise }))
          }
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
        <DateInput
          dateType={DateInputType.DateTime}
          label="Date"
          value={date}
          onChange={updateDate}
          className="col-span-3"
        />
        <WorkingBodyPartInput />
        <RepetitionForm />
        <div className="col-span-full bg-blue-500 sticky bottom-0 py-2 flex items-center justify-between">
          {isEditing && (
            <Button
              className="rounded-lg h-12 w-16 bg-transparent"
              textClassName="text-red-500"
              text="Delete"
              buttonStyle={ButtonStyle.Clear}
              onClick={onDelete}
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
