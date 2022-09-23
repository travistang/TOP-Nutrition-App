import React from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom, CreateEditExerciseRecordProps } from '../../../atoms/CreateEditExerciseRecordAtom';
import ExerciseDatabase from '../../../database/ExerciseDatabase';
import ProgressiveForm from '../../ProgressiveForm';
import { ProgressiveFormConfig } from '../../ProgressiveForm/context';
import ExerciseFormPreview from './ExerciseFormPreview';
import ExerciseNameAndTypeForm from './ExerciseNameAndTypeForm';
import RepetitionInputGroup from './RepetitionInputGroup';
import TimeForm from './TimeForm';
import { CreateExerciseStep, CreateExerciseStepIconMap } from './types';

const FormComponentMap: Record<CreateExerciseStep, React.FC<any>> = {
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
  const [exerciseSetValue] = useRecoilState(createEditExerciseRecordAtom);

  const isEditing = !!exerciseSetValue.id;
  const onSubmit = async () => {
    const { id, exercise, repetitions, date } = exerciseSetValue;
    if (isEditing) {
      await ExerciseDatabase.updateRecord(id!, exercise, repetitions, date);
      toast.success("Record updated");
    } else {
      await ExerciseDatabase.addRecord(exercise, repetitions, date);
      toast.success("Record added");
    }
  };

  const progressiveFormConfig: ProgressiveFormConfig = {
    steps: Object.values(CreateExerciseStep).map(step => ({
      icon: CreateExerciseStepIconMap[step as CreateExerciseStep],
      formComponent: FormComponentMap[step as CreateExerciseStep],
      key: step as string,
    })),
    onSubmit,
    nextStep: (step: number) => canProceedToNextStep(step, exerciseSetValue) ? step + 1 : null,
  }

  return (
    <ProgressiveForm config={progressiveFormConfig} className="min-h-[50vh]">
      <ExerciseFormPreview />
    </ProgressiveForm>
  );
}