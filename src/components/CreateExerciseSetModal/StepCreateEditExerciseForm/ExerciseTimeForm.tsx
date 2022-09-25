import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import CheckboxInput from "../../Input/CheckboxInput";
import { progressiveFormContext } from "../../ProgressiveForm/context";
import ProgressiveTimeForm from "../../ProgressiveForm/TimeForm";
import SmallNotice from "../../SmallNotice";

export default function TimeForm() {
  const { toggleRestartOnComplete, restartOnComplete } = useContext(
    progressiveFormContext
  );
  const [exerciseAtom, setExerciseAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { date } = exerciseAtom;
  const isEditing = !!exerciseAtom.id;

  const setDate = (date: Date) =>
    setExerciseAtom((atom) => ({ ...atom, date }));

  return (
    <ProgressiveTimeForm date={date} setDate={setDate}>
      {!isEditing ? (
        <CheckboxInput
          className="pt-4"
          onCheck={toggleRestartOnComplete}
          selected={restartOnComplete}
          label="Add another set"
        />
      ) : (
        <SmallNotice icon="info-circle">
          You are updating an existing record
        </SmallNotice>
      )}
    </ProgressiveTimeForm>
  );
}
