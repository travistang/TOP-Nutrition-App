import React from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { Equipment, Exercise, ExerciseMode } from "../../types/Exercise";
import SelectInput from "../Input/SelectInput";

type Props = {
  label: string;
  field: Exclude<keyof Exercise, "workingBodyParts">;
  className?: string;
};
export default function ExerciseFieldSelectInput({
  label,
  field,
  className,
}: Props) {
  const [{ exercise }, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const setExerciseData = (value: string) => {
    setCreateEditRecordAtom((record) => ({
      ...record,
      exercise: { ...exercise, [field]: value },
    }));
  };
  const getOptions = () => {
    switch (field) {
      case "equipment":
        return Object.values(Equipment);
      case "exerciseMode":
        return Object.values(ExerciseMode);
      default:
        return [];
    }
  };
  return (
    <SelectInput
      label={label}
      value={exercise[field]}
      options={getOptions().map((option) => ({
        value: option,
        label: option.replace("_", " "),
      }))}
      onSelect={setExerciseData}
      className={className}
    />
  );
}
