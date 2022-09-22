import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom } from '../../../atoms/CreateEditExerciseRecordAtom';
import { DateInputType } from '../../Input/DateInput';
import DateTimePicker from '../../Input/DateInput/DateTimePicker';
import TabSelectInput, { Option } from '../../Input/TabSelectInput';
import { CreateExerciseStep, StepFormProps } from './types';

const TimeInputOptions: Option<boolean>[] = [{
  icon: "clock",
  text: "Now",
  value: true,
}, {
  icon: "calendar",
  text: "Other time...",
  value: false,
}]
export default function TimeForm({ step }: StepFormProps) {
  const [exerciseAtom, setExerciseAtom] = useRecoilState(createEditExerciseRecordAtom);
  const [useCurrentTime, setUseCurrentTime] = useState(true);
  const setDate = (date: Date) => setExerciseAtom(atom => ({ ...atom, date }));

  useEffect(() => {
    if (useCurrentTime) {
      setDate(new Date());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCurrentTime]);

  if (step !== CreateExerciseStep.Time) return null;

  const { date } = exerciseAtom;


  return (
    <>
      <span className="text-xs">Exercise time</span>
      <TabSelectInput options={TimeInputOptions} selected={useCurrentTime} onSelect={setUseCurrentTime} />
      {!useCurrentTime && (
        <div className="px-12">
          <DateTimePicker calendarClassName="gap-y-1" inline value={date} onSelectDate={setDate} mode={DateInputType.DateTime} />
        </div>
      )}
    </>
  );
}