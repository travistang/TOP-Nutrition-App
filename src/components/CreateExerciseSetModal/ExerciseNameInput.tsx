import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom } from '../../atoms/CreateEditExerciseRecordAtom';
import ExerciseDatabase from '../../database/ExerciseDatabase';
import { Exercise } from '../../types/Exercise';
import AutoCompleteInput from '../Input/AutoCompleteInput';
import ExerciseAutocompleteResult from '../Input/ExerciseAutocompleteResult';

type Props = {
  className?: string;
}
export default function ExerciseNameInput({ className }:Props) {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const recentExercises = useLiveQuery(() => ExerciseDatabase.recentExercises());

  const { exercise } = createEditRecordAtom;
  const setName = (name: string) => {
    setCreateEditRecordAtom(atom => ({
      ...atom,
      exercise: {
        ...atom.exercise,
        name
      }
    }));
  };

  return (
    <AutoCompleteInput
      label="Exercise name"
      value={exercise.name}
      defaultResults={recentExercises}
      onSearch={(searchString) =>
        ExerciseDatabase.searchExercise(searchString)
      }
      renderResult={(exercise: Exercise) => (
        <ExerciseAutocompleteResult exercise={exercise} />
      )}
      onSelectSearchResult={(exercise: Exercise) =>
        setCreateEditRecordAtom((record) => ({ ...record, exercise, date: new Date() }))
      }
      className={className}
      onChange={setName}
    />
  )
}