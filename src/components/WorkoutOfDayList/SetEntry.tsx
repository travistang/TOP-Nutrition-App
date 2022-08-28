import React from "react";

import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import { ExerciseSetType } from "../../types/Exercise";
import RestTimeText from "./RestTimeText";
import SetItem from "./SetItem";
import ArrayUtils from "../../utils/Array";

type Props = {
  workouts: ExerciseSetRecord[];
  index: number;
  propertiesIndices: ExercisePropertiesIndices;
};
type ExercisePropertiesIndices = Record<ExerciseSetType, number[]>;
const computeSetProperties = (
  index: number,
  indicesList: ExercisePropertiesIndices
): ExerciseSetType[] => {
  const propertyIndicesPair = Object.entries(indicesList) as [
    ExerciseSetType,
    number[]
  ][];
  return propertyIndicesPair.reduce((properties, [property, indices]) => {
    if (indices.includes(index)) {
      return [...properties, property];
    }
    return properties;
  }, [] as ExerciseSetType[]);
};

export default function SetEntry({
  workouts,
  index,
  propertiesIndices,
}: Props) {
  const set = workouts[index];
  const isLastSet = index === workouts.length - 1;
  const dropSetOrSuperSetIndex = [
    ...propertiesIndices[ExerciseSetType.Dropset],
    ...propertiesIndices[ExerciseSetType.Superset],
  ];
  const shouldShowRestTime =
    !isLastSet &&
    !ArrayUtils.hasSome(dropSetOrSuperSetIndex, [index, index + 1]);
  return (
    <>
      <SetItem
        set={set}
        index={index}
        properties={computeSetProperties(index, propertiesIndices)}
      />
      {shouldShowRestTime && (
        <RestTimeText
          currentSetTime={set.date}
          nextSetTime={workouts[index + 1].date}
        />
      )}
    </>
  );
}
