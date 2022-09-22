import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom, CreateEditExerciseRecordProps, DEFAULT_EXERCISE_RECORD } from '../../../atoms/CreateEditExerciseRecordAtom';
import ExerciseDatabase from '../../../database/ExerciseDatabase';
import CheckboxInput from '../../Input/CheckboxInput';
import StepList from '../../StepList';
import ExerciseFormPreview from './ExerciseFormPreview';
import ExerciseNameAndTypeForm from './ExerciseNameAndTypeForm';
import ProceedButtonGroup from './ProceedButtonGroup';
import RepetitionInputGroup from './RepetitionInputGroup';
import TimeForm from './TimeForm';
import { CreateExerciseStep, CreateExerciseStepIconMap, StepFormProps } from './types';

const FormComponentMap: Partial<Record<CreateExerciseStep, React.FC<StepFormProps>>> = {
  [CreateExerciseStep.Name]: ExerciseNameAndTypeForm,
  [CreateExerciseStep.Type]: ExerciseNameAndTypeForm,
  [CreateExerciseStep.Weight]: RepetitionInputGroup,
  [CreateExerciseStep.Repetition]: RepetitionInputGroup,
  [CreateExerciseStep.Time]: TimeForm,
};

const canProceedToNextStep = (step: CreateExerciseStep, exerciseValue: CreateEditExerciseRecordProps) => {
  switch (step) {
    case CreateExerciseStep.Name:
      return !!exerciseValue.exercise.name;
    case CreateExerciseStep.Weight:
      return exerciseValue.repetitions.weight > 1;
    case CreateExerciseStep.Repetition:
      return exerciseValue.repetitions.count > 0;
    default:
      return true;
  }
};

export default function StepCreateEditExerciseForm() {
  const [exerciseSetValue, setExerciseSetValue] = useRecoilState(createEditExerciseRecordAtom);
  const [step, setStep] = useState<CreateExerciseStep>(CreateExerciseStep.Name);
  const [addAnotherSet, setAddAnotherSet] = useState(false);

  const isEditing = !!exerciseSetValue.id;
  const canProceed = canProceedToNextStep(step, exerciseSetValue);
  const isLastStep = step === CreateExerciseStep.Time;
  const FormComponent = FormComponentMap[step];

  const onSubmit = async () => {
    const { id, exercise, repetitions, date } = exerciseSetValue;
    if (isEditing) {
      await ExerciseDatabase.updateRecord(id!, exercise, repetitions, date);
      toast.success("Record updated");
    } else {
      await ExerciseDatabase.addRecord(exercise, repetitions, date);
      toast.success("Record added");
    }

    if (addAnotherSet && !isEditing) {
      setStep(CreateExerciseStep.Name);
      setExerciseSetValue({
        ...exerciseSetValue,
        date: new Date(),
        modalOpened: true
      });
    } else {
      setExerciseSetValue(DEFAULT_EXERCISE_RECORD);
    }
  };

  return (
    <div className='flex flex-col items-stretch min-h-[50vh]'>
      <StepList
        className="pb-2"
        stepIcons={Object.values(CreateExerciseStepIconMap)}
        currentStep={step}
      />
      <div className="flex-1 flex flex-col items-stretch gap-2">
        <ExerciseFormPreview step={step} onGotoStep={setStep} />
        {FormComponent && <FormComponent step={step} onGotoStep={setStep} />}
      </div>
      {isLastStep && (
        !isEditing ? <CheckboxInput onCheck={() => setAddAnotherSet(!addAnotherSet)} selected={addAnotherSet} label="Add another set" />
          : <span className="text-xs"><FontAwesomeIcon icon="info-circle" className="mr-2" />You are updating an existing record</span>
      )}
      <ProceedButtonGroup
        step={step}
        setStep={setStep}
        isLastStep={isLastStep}
        canProceed={canProceed}
        onSubmit={onSubmit}
      />
    </div>
  );
}