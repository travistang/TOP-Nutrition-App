import React, { useEffect, useRef } from 'react';
import ExerciseNameInput from '../ExerciseNameInput';
import { CreateExerciseStep } from './types';
import EquipmentModeInput from './EquipmentModeInput';


type Props = {
  step: CreateExerciseStep,
  onGotoStep: (step: CreateExerciseStep) => void;
};
export default function ExerciseNameAndTypeForm({ step, onGotoStep }: Props) {
  const exerciseInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => exerciseInputRef.current?.focus(), []);

  useEffect(() => {
    if (exerciseInputRef.current) {
      const inputRef = exerciseInputRef.current;
      const onFocus = () => onGotoStep(CreateExerciseStep.Name);
      exerciseInputRef.current.onfocus = onFocus;
      return () => inputRef.removeEventListener('focus', onFocus)
    }
  }, [onGotoStep]);

  if (step > CreateExerciseStep.Type) return null;

  return (
    <div className="flex flex-col items-stretch gap-2">
      <ExerciseNameInput
        showDefaultSuggestions={step === CreateExerciseStep.Name}
        inputRef={exerciseInputRef}
        onSelected={() => onGotoStep(CreateExerciseStep.Type)}
      />
      {
        step === CreateExerciseStep.Type && (
          <>
            <EquipmentModeInput label="Exercise mode" field="exerciseMode" />
            <EquipmentModeInput label="Equipment" field="equipment" />
          </>
        )
      }
    </div>
  );
}