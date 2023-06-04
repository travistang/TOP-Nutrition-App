import classNames from "classnames";
import React from "react";
import { ExerciseSetRecord } from "../../../database/ExerciseDatabase";
import {
  AvailableWorkoutFilters,
  FilterableExerciseKeys,
  WorkoutFilter as WorkoutFilterType,
} from "./useWorkoutFilter";
import AttributeValueInputToggle, {
  AttributeValueOptions,
} from "../../Input/AttributeValueInputToggle";
import { ArrayEl } from "../../../types/utils";
import {
  Equipment,
  EquipmentIcon,
  Exercise,
  ExerciseMode,
  ExerciseModeIcon,
} from "../../../types/Exercise";

import StringUtils from "../../../utils/String";

type WorkoutFilterOptions = {
  [K in FilterableExerciseKeys]: AttributeValueOptions<ArrayEl<Exercise[K]>>[];
};
const WorkoutFilterOptionsMapping: WorkoutFilterOptions = {
  exerciseMode: Object.values(ExerciseMode).map((mode) => ({
    value: mode,
    label: StringUtils.normalizeSnakeCase(mode),
    icon: ExerciseModeIcon[mode],
  })),
  equipment: Object.values(Equipment).map((equipment) => ({
    value: equipment,
    label: StringUtils.normalizeSnakeCase(equipment),
    icon: EquipmentIcon[equipment],
  })),
};

type Props = {
  className?: string;
  exercises: ExerciseSetRecord[];
  availableFilters: AvailableWorkoutFilters;
  currentFilter: WorkoutFilterType;
  toggleFilter: (key: FilterableExerciseKeys) => void;
};
export default function WorkoutFilter({
  availableFilters,
  currentFilter,
  toggleFilter,
  className,
}: Props) {
  const hasOptions = Object.values(availableFilters).some(
    (maybeOptions) => maybeOptions && maybeOptions.length > 1
  );

  if (!hasOptions) {
    return null;
  }

  return (
    <div
      className={classNames("grid grid-cols-2 gap-2 items-center", className)}
    >
      <span className="col-span-full text-sm">Filters</span>
      {(Object.keys(availableFilters) as FilterableExerciseKeys[])
        .filter((key) => availableFilters[key])
        .map((filterKey) => (
          <AttributeValueInputToggle
            key={filterKey}
            noMatchMessage={<span className="text-sm">Any</span>}
            label={StringUtils.normalizeCamelCase(filterKey)}
            options={WorkoutFilterOptionsMapping[filterKey]}
            className="flex-1"
            onToggle={() => toggleFilter(filterKey)}
            value={currentFilter[filterKey] ?? null}
          />
        ))}
    </div>
  );
}
