import { useCallback, useMemo, useState } from "react";
import { ExerciseSetRecord } from "../../../database/ExerciseDatabase";
import { Exercise } from "../../../types/Exercise";
import ArrayUtils from "../../../utils/Array";

type ArrayEl<T> = T extends (infer R)[] ? R : never;
type ToArray<T> = [T] extends [Array<any>] ? T : T[];
export type FilterableExerciseKeys = "equipment" | "exerciseMode";
export type AvailableWorkoutFilters = {
  [K in FilterableExerciseKeys]?: ToArray<Exercise[K]>;
};
export type WorkoutFilter = {
  [K in FilterableExerciseKeys]: ArrayEl<AvailableWorkoutFilters[K]> | null;
};

const computeAvailableFilters = (
  exercises: ExerciseSetRecord[]
): AvailableWorkoutFilters => {
  const exerciseMode = ArrayUtils.unique(
    exercises.map((e) => e.exercise.exerciseMode)
  );
  const equipment = ArrayUtils.unique(
    exercises.map((e) => e.exercise.equipment)
  );
  const removeSingleOption = <T>(options: T[]) =>
    options.length <= 1 ? undefined : options;

  return {
    exerciseMode: removeSingleOption(exerciseMode),
    equipment: removeSingleOption(equipment),
  };
};

const DEFAULT_FILTER: WorkoutFilter = {
  exerciseMode: null,
  equipment: null,
};

const computeNextOptionIndex = (numOptions: number, currentIndex: number) => {
  if (currentIndex === -1) return 0;
  if (currentIndex + 1 === numOptions) return -1;
  return currentIndex + 1;
};

const toNextFilter = (
  availableFilter: Partial<AvailableWorkoutFilters>,
  currentFilter: WorkoutFilter,
  toggleKey: keyof AvailableWorkoutFilters
): WorkoutFilter => {
  const availableFilterValues = availableFilter[toggleKey];
  if (!availableFilterValues?.length) {
    return currentFilter;
  }
  const currentFilterUsed = currentFilter[toggleKey];
  const currentIndex = availableFilterValues.findIndex(
    (option) => option === currentFilterUsed
  );
  const nextIndex = computeNextOptionIndex(
    availableFilterValues.length,
    currentIndex
  );
  const nextOption = availableFilterValues[nextIndex] ?? null;
  return {
    ...currentFilter,
    [toggleKey]: nextOption,
  };
};

const applyFilter =
  (filter: WorkoutFilter) =>
  (record: ExerciseSetRecord): boolean => {
    const { equipment, exerciseMode } = filter;
    if (equipment && record.exercise.equipment !== equipment) {
      return false;
    }
    if (exerciseMode && record.exercise.exerciseMode !== exerciseMode) {
      return false;
    }

    return true;
  };

type UseWorkoutFilterResult = {
  availableFilters: AvailableWorkoutFilters;
  appliedFilter: WorkoutFilter;
  toggleFilter: (key: FilterableExerciseKeys) => void;
  filteredRecords: ExerciseSetRecord[];
};
export default function useWorkoutFilter(
  exercises: ExerciseSetRecord[]
): UseWorkoutFilterResult {
  console.log("use workoutfilter start");
  const availableFilters = computeAvailableFilters(exercises);
  const [appliedFilter, setAppliedFilter] = useState(DEFAULT_FILTER);

  const toggleFilter = useCallback(
    (key: FilterableExerciseKeys) => {
      const nextFilter = toNextFilter(availableFilters, appliedFilter, key);
      setAppliedFilter(nextFilter);
    },
    [availableFilters, appliedFilter]
  );

  const filteredRecords = useMemo(
    () => exercises.filter(applyFilter(appliedFilter)),
    [exercises, appliedFilter]
  );
  console.log("use workoutfilter end");

  return {
    availableFilters,
    appliedFilter,
    toggleFilter,
    filteredRecords,
  };
}
