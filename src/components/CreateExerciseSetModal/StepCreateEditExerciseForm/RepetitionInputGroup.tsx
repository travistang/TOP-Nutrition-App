import React from 'react';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom } from '../../../atoms/CreateEditExerciseRecordAtom';
import { Repetition } from '../../../types/Exercise';
import { Modifier } from '../../../types/utils';
import DigitInput from '../../Input/DigitInput';
import { CreateExerciseStep, StepFormProps } from './types';

type FormConfig = {
  title: string;
  field: keyof Repetition;
  unit: string;
  integer: boolean;
};

const FormConfigMap: Partial<Record<CreateExerciseStep, FormConfig>> = {
  [CreateExerciseStep.Weight]: {
    title: 'Weight',
    field: 'weight',
    unit: 'kg',
    integer: false,
  },
  [CreateExerciseStep.Repetition]: {
    title: 'Repetition',
    field: 'count',
    unit: 'reps',
    integer: true,
  },
};

export default function RepetitionInputGroup({ step }: StepFormProps) {
  const [exerciseAtomValue, setExerciseAtomvalue] = useRecoilState(createEditExerciseRecordAtom);
  const { repetitions } = exerciseAtomValue;

  const updateRepetition: Modifier<Repetition> = (field) => (value) => {
    setExerciseAtomvalue(atom => ({ ...atom, repetitions: { ...atom.repetitions, [field]: value } }));
  };
  if (step !== CreateExerciseStep.Weight && step !== CreateExerciseStep.Repetition) {
    return null;
  }

  const { title, field, unit, integer } = FormConfigMap[step] as FormConfig;
  return (
    <div key={step} className="flex flex-col items-stretch">
      <span className="text-xs">{title}</span>
      <DigitInput integer={integer} defaultValue={repetitions[field]} onChange={updateRepetition(field)} unit={unit} />
    </div>
  );
}