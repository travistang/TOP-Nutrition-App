import classNames from "classnames";
import { useEffect, useState } from "react";
import ExerciseDatabase from "../../../../database/ExerciseDatabase";
import { Exercise } from "../../../../types/Exercise";
import AutoCompleteInput from "../../AutoCompleteInput";
import ExerciseAutocompleteResult from "../../ExerciseAutocompleteResult";

type Props = {
  className?: string;
  selectedExercise?: Exercise;
  onSelectExercise: (exercise?: Exercise) => void;
};
const searchExercise = (searchString: string) => {
  return ExerciseDatabase.searchExercise(searchString);
};

export default function ExerciseSearchInput({
  className,
  selectedExercise,
  onSelectExercise,
}: Props) {
  const [input, setInput] = useState("");
  const onInputChange = (newInput: string) => {
    if (!newInput) {
      onSelectExercise(undefined);
    }
    setInput(newInput);
  };
  const selectExercise = (exercise: Exercise) => {
    setInput(exercise.name);
    onSelectExercise(exercise);
  };

  useEffect(() => {
    if (!selectedExercise) return;
    setInput(selectedExercise.name);
  }, [selectedExercise]);

  return (
    <div className={classNames("flex flex-col gap-2 items-stretch", className)}>
      <AutoCompleteInput
        inline
        icon="search"
        placeholder="Search for exercise..."
        value={input}
        onChange={onInputChange}
        renderResult={(exercise: Exercise) => (
          <ExerciseAutocompleteResult exercise={exercise} />
        )}
        onSelectSearchResult={selectExercise}
        onSearch={searchExercise}
      />
    </div>
  );
}
