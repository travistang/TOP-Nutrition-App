
import React from 'react';
import { useRecoilValue } from 'recoil';
import { createEditExerciseRecordAtom } from '../../../atoms/CreateEditExerciseRecordAtom';
import { CreateExerciseStep } from './types';
import SetItem from '../../WorkoutOfDayList/SetItem';
import { ExerciseSetRecord } from '../../../database/ExerciseDatabase';

type Props = {
  step: CreateExerciseStep;
  onGotoStep: (step: CreateExerciseStep) => void;
}
export default function ExerciseFormPreview({ step, onGotoStep }: Props) {
  const createExerciseAtomValue = useRecoilValue(createEditExerciseRecordAtom);
  const { exercise, repetitions } = createExerciseAtomValue;

  const isExerciseDefined = !!exercise.name;

  if (!isExerciseDefined || step <= CreateExerciseStep.Type) return null;

  const previewSet: ExerciseSetRecord = {
    exercise,
    repetitions,
    id: 'preview',
    date: Date.now(),
  };

  return (
    <SetItem preview set={previewSet} index={-1} properties={[]} />
  );
}