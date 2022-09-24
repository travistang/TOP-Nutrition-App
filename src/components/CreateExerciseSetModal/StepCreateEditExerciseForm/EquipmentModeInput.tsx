import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import {
  Equipment,
  EquipmentIcon,
  Exercise,
  ExerciseMode,
  ExerciseModeIcon,
} from "../../../types/Exercise";
import StringUtils from "../../../utils/String";
import TabSelectInput, { Option } from "../../Input/TabSelectInput";

type Props<T extends keyof Exercise> = {
  label: string;
  field: T;
  disabledOptions?: Exercise[T][];
};
export default function EquipmentModeInput<
  T extends "exerciseMode" | "equipment"
>({ label, field, disabledOptions }: Props<T>) {
  const [
    {
      exercise: { [field]: selectedValue },
    },
    setAtom,
  ] = useRecoilState(createEditExerciseRecordAtom);
  const updateField = (value: Exercise[T]) =>
    setAtom((atom) => ({
      ...atom,
      exercise: { ...atom.exercise, [field]: value },
    }));
  const IconMapping = (
    field === "equipment" ? EquipmentIcon : ExerciseModeIcon
  ) as Record<Exercise[T], IconProp>;
  const enumValues = (
    field === "equipment"
      ? Object.values(Equipment)
      : Object.values(ExerciseMode)
  ) as Exercise[T][];

  const options: Option<Exercise[T]>[] = enumValues
    .filter((value) => !disabledOptions?.includes(value))
    .map((value) => ({
      icon: IconMapping[value],
      text: value,
      value,
    }));

  return (
    <TabSelectInput
      iconOnly
      selected={selectedValue}
      onSelect={updateField}
      options={options}
      label={
        <>
          {label}:
          <b className="pl-2">
            {StringUtils.normalizeSnakeCase(selectedValue as unknown as string)}
          </b>
        </>
      }
    />
  );
}
