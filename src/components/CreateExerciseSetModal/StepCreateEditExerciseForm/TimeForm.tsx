import React, { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import CheckboxInput from "../../Input/CheckboxInput";
import { DateInputType } from "../../Input/DateInput";
import DateTimePicker from "../../Input/DateInput/DateTimePicker";
import TabSelectInput, { Option } from "../../Input/TabSelectInput";
import { progressiveFormContext } from "../../ProgressiveForm/context";
import SmallNotice from "../../SmallNotice";
import { CreateExerciseStep } from "./types";

const TimeInputOptions: Option<boolean>[] = [
  {
    icon: "clock",
    text: "Now",
    value: true,
  },
  {
    icon: "calendar",
    text: "Other time...",
    value: false,
  },
];

export default function TimeForm() {
  const { step } = useContext(progressiveFormContext);
  const { toggleRestartOnComplete, restartOnComplete } = useContext(
    progressiveFormContext
  );
  const [exerciseAtom, setExerciseAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const isEditing = !!exerciseAtom.id;
  const [useCurrentTime, setUseCurrentTime] = useState(!isEditing);
  const setDate = (date: Date) =>
    setExerciseAtom((atom) => ({ ...atom, date }));

  useEffect(() => {
    if (useCurrentTime) {
      setDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCurrentTime]);

  if (step !== CreateExerciseStep.Time) return null;

  const { date } = exerciseAtom;

  return (
    <div className="flex flex-col items-stretch">
      <span className="text-xs">Exercise time</span>
      <TabSelectInput
        options={TimeInputOptions}
        selected={useCurrentTime}
        onSelect={setUseCurrentTime}
      />
      {!useCurrentTime && (
        <div className="px-12">
          <DateTimePicker
            calendarClassName="gap-y-1"
            inline
            value={date}
            onSelectDate={setDate}
            mode={DateInputType.DateTime}
          />
        </div>
      )}
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
    </div>
  );
}
