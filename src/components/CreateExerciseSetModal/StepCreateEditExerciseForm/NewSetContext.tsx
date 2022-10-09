import React, { useContext, useState } from 'react';
import { CreateEditExerciseRecordProps } from '../../../atoms/CreateEditExerciseRecordAtom';
import { DEFAULT_EXERCISE, DEFAULT_REPETITION } from '../../../types/Exercise';
import ObjectUtils from '../../../utils/Object';
import { CreateExerciseStep } from './types';

export enum NewSetOption {
  None = 'none',
  Dropset = 'dropset',
  Superset = 'superset',
}
export type NewSetContextValue = {
  newSetOption: NewSetOption;
  setNewSetOption: (option: NewSetOption) => void;
};
const DEFAULT_NEW_SET_CONTEXT_VALUE: NewSetContextValue = {
  newSetOption: NewSetOption.None,
  setNewSetOption: () => { }
};
export const newSetContext = React.createContext<NewSetContextValue>(DEFAULT_NEW_SET_CONTEXT_VALUE);

type Props = {
  children: React.ReactNode;
};
export default function NewSetContextProvider({ children }: Props) {
  const [newSetOption, setNewSetOption] = useState<NewSetOption>(NewSetOption.None);
  const value: NewSetContextValue = {
    newSetOption,
    setNewSetOption
  };
  return (
    <newSetContext.Provider value={value}>
      {children}
    </newSetContext.Provider>
  );
}

export type RestartOptionProps = {
  record: CreateEditExerciseRecordProps;
  setExerciseRecord: (record: CreateEditExerciseRecordProps) => void;
};
export function useRestartWithNewSetOption({ record, setExerciseRecord }: RestartOptionProps) {
  const { newSetOption } = useContext(newSetContext);

  return (goToStep: (step: number) => void) => {
    switch (newSetOption) {
      case NewSetOption.None:
        setExerciseRecord(ObjectUtils.deepUpdate(record, 'modalOpened', false));
        break;
      case NewSetOption.Dropset:
        goToStep(CreateExerciseStep.Weight);
        setExerciseRecord(ObjectUtils.multiDeepUpdate(
          record, {
          'repetitions.weight': 0,
          'repetitions.count': 0,
        }));
        break;
      case NewSetOption.Superset:
        goToStep(CreateExerciseStep.Name);
        setExerciseRecord(ObjectUtils.multiDeepUpdate(
          record, {
            'exercise': DEFAULT_EXERCISE,
            'repetitions': DEFAULT_REPETITION,
        }));
        break;
    }
  };
}