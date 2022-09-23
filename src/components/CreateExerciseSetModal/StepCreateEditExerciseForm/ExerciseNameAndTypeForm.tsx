import React, { KeyboardEvent, useContext, useEffect, useRef } from 'react';
import ExerciseNameInput from '../ExerciseNameInput';
import { CreateExerciseStep } from './types';
import EquipmentModeInput from './EquipmentModeInput';
import { progressiveFormContext } from '../../ProgressiveForm/context';

export default function ExerciseNameAndTypeForm() {
  const { step, goToStep } = useContext(progressiveFormContext);
  const exerciseInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => exerciseInputRef.current?.focus(), []);

  useEffect(() => {
    if (exerciseInputRef.current) {
      const inputRef = exerciseInputRef.current;
      const onFocus = () => goToStep(CreateExerciseStep.Name);
      exerciseInputRef.current.onfocus = onFocus;
      return () => inputRef.removeEventListener('focus', onFocus)
    }
  }, [goToStep]);

  if (step > CreateExerciseStep.Type) return null;

  const handleExerciseNameInputKey = (keyEvent: KeyboardEvent) => {
    if (!exerciseInputRef.current?.value) return;
    if (keyEvent.key.toLowerCase() === 'enter') {
      goToStep(CreateExerciseStep.Type);
      exerciseInputRef.current.blur();
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2">
      <ExerciseNameInput
        showDefaultSuggestions={step === CreateExerciseStep.Name}
        inputRef={exerciseInputRef}
        onSelected={() => goToStep(CreateExerciseStep.Type)}
        onKeyDown={handleExerciseNameInputKey}
      />
      {step === CreateExerciseStep.Type && (
          <>
            <EquipmentModeInput label="Exercise mode" field="exerciseMode" />
            <EquipmentModeInput label="Equipment" field="equipment" />
          </>
      )}
    </div>
  );
}