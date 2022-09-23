import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRecoilState } from 'recoil';
import { createEditExerciseRecordAtom } from '../../atoms/CreateEditExerciseRecordAtom';
import ExerciseDatabase from '../../database/ExerciseDatabase';
import { Exercise } from '../../types/Exercise';
import ArrayUtils from '../../utils/Array';
import ExerciseDomain from '../../domain/Exercise';
import AutoCompleteInput from '../Input/AutoCompleteInput';
import ExerciseAutocompleteResult from '../Input/ExerciseAutocompleteResult';

type Props = {
  className?: string;
  showDefaultSuggestions?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onSelected?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};
export default function ExerciseNameInput({ className, showDefaultSuggestions, inputRef, onSelected, onKeyDown }: Props) {
  const [createEditRecordAtom, setCreateEditRecordAtom] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const recentExercises = useLiveQuery(() => ExerciseDatabase.recentExercises());
  const { exercise } = createEditRecordAtom;

  const setName = (name: string) => {
    const matchingWorkoutPartsFromName = ExerciseDomain.detectWorkoutPartFromName(name);
    const newWorkoutParts = ArrayUtils.distinct([
      ...exercise.workingBodyParts,
      ...matchingWorkoutPartsFromName
    ]);
    setCreateEditRecordAtom(atom => ({
      ...atom,
      exercise: {
        ...atom.exercise,
        workingBodyParts: newWorkoutParts,
        name
      }
    }));
  };

  const onSelectExercise = (exercise: Exercise) => {
    setCreateEditRecordAtom((record) => ({ ...record, exercise, date: new Date() }));
    onSelected?.();
  };

  return (
    <AutoCompleteInput
      inline
      icon="search"
      placeholder='Search for exercise...'
      inputRef={inputRef}
      label="Exercise name"
      value={exercise.name}
      defaultResults={showDefaultSuggestions ? recentExercises : []}
      onSearch={(searchString) =>
        ExerciseDatabase.searchExercise(searchString)
      }
      renderResult={(exercise: Exercise) => (
        <ExerciseAutocompleteResult exercise={exercise} />
      )}
      onSelectSearchResult={onSelectExercise}
      className={className}
      onChange={setName}
      onKeyDown={onKeyDown}
    />
  );
}