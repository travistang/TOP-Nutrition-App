import React from "react";
import {
  CardioExercise,
  CardioExerciseType,
} from "../../../types/CardioExercise";
import { Modifier } from "../../../types/utils";
import DateInput, { DateInputType } from "../../Input/DateInput";
import CardioExercisePreview from "../CardioExercisePreview";
import TextInput from "../../Input/TextInput";
import GPXFilePicker from "../GPXFilePicker";
import NumberFieldInputGroup from "../NumberFieldInputGroup";

type Props = {
  record: CardioExercise;
  onChange: (record: CardioExercise) => void;
};

export default function CardioExerciseDetailForms({ record, onChange }: Props) {
  const onDateChange = (date: Date) => {
    onChange({ ...record, date: date.getTime() });
  };

  const onChangeFieldValue: Modifier<CardioExercise> = (field) => (value) => {
    onChange({ ...record, [field]: value });
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      <CardioExercisePreview className="col-span-4" record={record} />
      <div className="col-span-2 flex justify-end">
        <GPXFilePicker record={record} onChange={onChange} />
      </div>
      {record.type === CardioExerciseType.Hiking && (
        <TextInput
          className="col-span-4"
          label="Name"
          placeholder="Name of the peak, route etc."
          value={record.tripName}
          onChange={onChangeFieldValue("tripName" as keyof CardioExercise)}
        />
      )}
      <DateInput
        label="Date of exercise"
        dateType={DateInputType.DateTime}
        className="col-span-2 col-ends-6"
        value={record.date}
        onChange={onDateChange}
      />
      <TextInput
        label="Remarks"
        placeholder="Something special about this workout session?"
        onChange={onChangeFieldValue("remark")}
        value={record.remark}
        className="col-span-full"
      />
      <NumberFieldInputGroup record={record} onChange={onChange} />
    </div>
  );
}
