import React, { lazy, Suspense } from "react";
import {
  CardioExercise,
  CardioExerciseType,
} from "../../../types/CardioExercise";
import { Modifier } from "../../../types/utils";
import DateInput from "../../Input/DateInput";
import { DateInputType } from "../../Input/DateInput/types";
import CardioExercisePreview from "../CardioExercisePreview";
import TextInput from "../../Input/TextInput";
import NumberFieldInputGroup from "../NumberFieldInputGroup";
import Button, { ButtonStyle } from "../../Input/Button";
const GPXFilePicker = lazy(() => import("../GPXFilePicker"));

type Props = {
  record: CardioExercise;
  onChange: (record: CardioExercise) => void;
  onDelete?: () => void;
};

export default function CardioExerciseDetailForms({
  onDelete,
  record,
  onChange,
}: Props) {
  const onDateChange = (date: Date) => {
    onChange({ ...record, date: date.getTime() });
  };

  const onChangeFieldValue: Modifier<CardioExercise> = (field) => (value) => {
    onChange({ ...record, [field]: value });
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {onDelete && (
        <Button
          buttonStyle={ButtonStyle.BlockDanger}
          icon="trash"
          className="h-10 self-center"
          onClick={onDelete}
        />
      )}
      <CardioExercisePreview className="col-span-3" record={record} />
      <div className="col-span-2 col-end-7 pr-1 flex justify-end">
        <Suspense>
          <GPXFilePicker record={record} onChange={onChange} />
        </Suspense>
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
