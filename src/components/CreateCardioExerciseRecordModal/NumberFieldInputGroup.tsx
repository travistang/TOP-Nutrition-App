import React, { useState } from "react";
import { CardioExercise } from "../../types/CardioExercise";
import { AllKeyWithType } from "../../types/utils";
import AttributeValueInput from "../Input/AttributeValueInput";
import DigitInput from "../Input/DigitInput";
import { InputMode } from "../Input/DigitInput/utils/digitLogic";

type KeyWithNumber = Exclude<AllKeyWithType<CardioExercise, number>, "date">;

type FormConfig = {
  unit: string;
  label: string;
  integer?: boolean;
};
const FormConfigMapping: Record<KeyWithNumber, FormConfig> = {
  durationMinutes: {
    unit: "minutes",
    label: "Duration",
    integer: true,
  },
  elevation: {
    unit: "hm",
    label: "Elevation",
    integer: true,
  },
  distanceKm: {
    unit: "km",
    label: "Distance",
  },
};

type Props = {
  record: CardioExercise;
  onChange: (record: CardioExercise) => void;
};
export default function NumberFieldInputGroup({ record, onChange }: Props) {
  const [selectedField, setSelectedField] =
    useState<KeyWithNumber>("durationMinutes");
  const changeSelectedFieldValue = (v: number) => {
    onChange({ ...record, [selectedField]: v });
  };

  const numberFields = Object.keys(record).filter((key) =>
    Object.keys(FormConfigMapping).includes(key)
  ) as (keyof typeof FormConfigMapping)[];

  const selectedFieldConfig = FormConfigMapping[selectedField];

  return (
    <>
      {numberFields.map((field) => (
        <AttributeValueInput
          key={field}
          selected={selectedField === field}
          label={FormConfigMapping[field].label}
          value={record[field as keyof CardioExercise] as number}
          onSelect={() => setSelectedField(field as KeyWithNumber)}
          unit={FormConfigMapping[field].unit}
          integer={FormConfigMapping[field].integer}
          className="col-span-3"
        />
      ))}

      <DigitInput
        key={selectedField}
        className="col-span-full"
        inputMode={selectedFieldConfig.integer ? InputMode.Integer : undefined}
        unit={selectedFieldConfig.unit}
        defaultValue={record[selectedField as keyof CardioExercise] as number}
        onChange={changeSelectedFieldValue}
      />
    </>
  );
}
