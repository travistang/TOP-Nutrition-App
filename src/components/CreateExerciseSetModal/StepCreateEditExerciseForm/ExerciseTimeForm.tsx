import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import ProgressiveTimeForm from "../../ProgressiveForm/TimeForm";
import SmallNotice from "../../SmallNotice";
import NewSetToggle from "./NewSetToggle";

export default function TimeForm() {
  const [exerciseAtom, setExerciseAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { date } = exerciseAtom;
  const isEditing = !!exerciseAtom.id;

  const setDate = (date: Date) =>
    setExerciseAtom((atom) => ({ ...atom, date }));

  return (
    <ProgressiveTimeForm
      title="Exercise time"
      date={date}
      setDate={setDate}
      useCurrentTimeByDefault={!isEditing}>
      {!isEditing ? (
        <NewSetToggle />
      ) : (
        <SmallNotice icon="info-circle">
          You are updating an existing record
        </SmallNotice>
      )}
    </ProgressiveTimeForm>
  );
}
