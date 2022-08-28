import React from "react";
import { Duration } from "../../types/Duration";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ArrayUtils from "../../utils/Array";
import StringUtils from "../../utils/String";
import ExerciseUtils from "../../utils/Exercise";
import { Exercise } from "../../types/Exercise";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import ExerciseAutocompleteResult from "../Input/ExerciseAutocompleteResult";
import DateInput, { DateInputType } from "../Input/DateInput";
import SelectInput from "../Input/SelectInput";
import { WorkoutTrendMode } from "./types";

export type WorkoutTrendLineConfig = {
  searchText: string;
  selectedExercise: Exercise | null;
  selectMonth: Date;
  duration: Duration;
  trendMode: WorkoutTrendMode;
};
type Props = {
  config: WorkoutTrendLineConfig;
  onChange: (config: WorkoutTrendLineConfig) => void;
};

export default function WorkoutTrendLineConfigGroup({
  config,
  onChange,
}: Props) {
  const { searchText, selectMonth, duration, trendMode } = config;
  const setField =
    <T extends keyof WorkoutTrendLineConfig>(field: T) =>
    (value: WorkoutTrendLineConfig[T]) => {
      onChange({
        ...config,
        [field]: value,
      });
    };
  const workoutsInDuration = useLiveQuery(() => {
    return ExerciseDatabase.recordsInRange(selectMonth, duration);
  }, [selectMonth, duration]);

  const exerciseList = ArrayUtils.distinct(
    workoutsInDuration?.map((workout) => workout.exercise) ?? [],
    ExerciseUtils.isSameExercise
  );

  const getExerciseSearchResult = async (searchString: string) => {
    return exerciseList.filter((exercise) =>
      StringUtils.searchCaseInsensitive(exercise.name, searchString)
    );
  };
  return (
    <div className="grid grid-cols-6 gap-1 mb-4">
      <DateInput
        dateType={DateInputType.Month}
        value={selectMonth}
        onChange={setField("selectMonth")}
        className="col-span-4"
        label=""
      />
      <SelectInput
        label=""
        value={duration}
        onSelect={(v) => setField("duration")(v as Duration)}
        className="col-span-2"
        inputClassName="bg-gray-400 text-gray-700 text-sm"
        options={Object.values(Duration).map((duration) => ({
          label: duration,
          value: duration,
        }))}
      />
      <AutoCompleteInput
        label=""
        icon="search"
        placeholder="Search exercises..."
        className="col-span-3"
        inputClassName="bg-gray-300"
        innerInputClassName="text-gray-700 text-sm placeholder:text-sm"
        value={searchText}
        onChange={setField("searchText")}
        onSelectSearchResult={(exercise) => {
          onChange({
            ...config,
            selectedExercise: exercise,
            searchText: exercise.name,
          });
        }}
        onSearch={getExerciseSearchResult}
        renderResult={(exercise: Exercise) => (
          <ExerciseAutocompleteResult exercise={exercise} />
        )}
      />
      <SelectInput
        label=""
        value={trendMode}
        className="col-span-3"
        inputClassName="bg-gray-400 text-gray-700 text-sm"
        onSelect={(v) => setField("trendMode")(v as WorkoutTrendMode)}
        options={Object.values(WorkoutTrendMode).map((mode) => ({
          label: mode,
          value: mode,
        }))}
      />
    </div>
  );
}
