import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import { Repetition } from "../../../types/Exercise";
import { Modifier } from "../../../types/utils";
import DigitInput from "../../Input/DigitInput";
import { InputMode } from "../../Input/DigitInput/utils/digitLogic";
import { progressiveFormContext } from "../../ProgressiveForm/context";
import { CreateExerciseStep } from "./types";

type FormConfig = {
  title: string;
  field: keyof Repetition;
  unit: string;
  mode?: InputMode;
};

const FormConfigMap: Partial<Record<CreateExerciseStep, FormConfig>> = {
  [CreateExerciseStep.Weight]: {
    title: "Weight",
    field: "weight",
    unit: "kg",
  },
  [CreateExerciseStep.Repetition]: {
    title: "Repetition",
    field: "count",
    unit: "reps",
    mode: InputMode.Integer,
  },
};

export default function RepetitionInputGroup() {
  const { step } = useContext(progressiveFormContext);
  const [exerciseAtomValue, setExerciseAtomvalue] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const { repetitions } = exerciseAtomValue;

  const updateRepetition: Modifier<Repetition> = (field) => (value) => {
    setExerciseAtomvalue((atom) => ({
      ...atom,
      repetitions: { ...atom.repetitions, [field]: value },
    }));
  };
  if (
    step !== CreateExerciseStep.Weight &&
    step !== CreateExerciseStep.Repetition
  ) {
    return null;
  }

  const { title, field, unit, mode } = FormConfigMap[step] as FormConfig;
  return (
    <div key={step} className="flex flex-col items-stretch">
      <span className="text-xs">{title}</span>
      <DigitInput
        inputMode={mode}
        defaultValue={repetitions[field]}
        onChange={updateRepetition(field)}
        unit={unit}
      />
    </div>
  );
}
