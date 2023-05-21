import React, { useState } from "react";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import { Exercise } from "../../types/Exercise";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import ExerciseAutocompleteResult from "../Input/ExerciseAutocompleteResult";

type Props = {
  onClear: () => void;
  onRecordSelected: (record: Exercise) => void;
};
export default function ExerciseSearchPanel({
  onClear,
  onRecordSelected,
}: Props) {
  const [searchString, setSearchString] = useState("");
  const selectRecordWithSetString = (record: Exercise) => {
    setSearchString(record.name);
    onRecordSelected(record);
  };

  const onChange = (search: string) => {
    if (!search) {
      onClear();
    }
    setSearchString(search);
  };

  return (
    <div className="flex flex-col items-stretch">
      <AutoCompleteInput
        inline
        placeholder="Search for exercise.."
        icon="search"
        value={searchString}
        onChange={onChange}
        onSearch={ExerciseDatabase.searchExercise.bind(ExerciseDatabase)}
        onSelectSearchResult={selectRecordWithSetString}
        renderResult={(record) => (
          <ExerciseAutocompleteResult exercise={record} key={record.name} />
        )}
      />
    </div>
  );
}
