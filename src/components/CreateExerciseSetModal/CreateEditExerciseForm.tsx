import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import DateInput, { DateInputType } from "../Input/DateInput";
import ExerciseFieldSelectInput from "./ExerciseFieldSelectInput";
import ExerciseNameInput from "./ExerciseNameInput";
import RepetitionForm from "./RepetitionForm";
import WorkingBodyPartInput from "./WorkingBodyPartInput";
import Button, { ButtonStyle } from "../Input/Button";

import RepetitionUtils from "../../utils/Repetition";
import ExerciseUtils from "../../utils/Exercise";
import useExerciseAction from "./useExerciseAction";

export default function CreateEditExerciseForm() {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { onCreate, onDelete, onEdit, reset } = useExerciseAction();

  const { id, exercise, repetitions, date } = createEditRecordAtom;
  const isFormValid =
    RepetitionUtils.isValid(repetitions) && ExerciseUtils.isValid(exercise);
  const isEditing = !!id;

  const updateDate = (date: Date) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      date,
    }));
  };

  return (
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
  );
}
