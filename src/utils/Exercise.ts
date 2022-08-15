import { differenceInSeconds } from "date-fns";
import { Exercise, ExerciseSet } from "../types/Exercise";
import ArrayUtils from "./Array";

const isValid = (exercise: Exercise) =>
  !!exercise.name && exercise.workingBodyParts.length > 0;

const isSameExercise = (a: Exercise, b: Exercise) =>
  a.name === b.name &&
  a.exerciseMode === b.exerciseMode &&
  a.equipment === b.equipment &&
  ArrayUtils.isEqual(a.workingBodyParts, b.workingBodyParts);

const groupWorkouts = (sets: ExerciseSet[]): ExerciseSet[][] => {
  const setGroups: ExerciseSet[][] = [];
  for (let i = 0; i < sets.length; i++) {
    const currentSet = sets[i];
    if (setGroups.length === 0) {
      setGroups.push([sets[i]]);
      continue;
    }

    const previousSet = sets[i - 1];
    const differentSeconds = differenceInSeconds(currentSet.date, previousSet.date);
    const isPreviousSetSimilar =
      isSameExercise(previousSet.exercise, currentSet.exercise) ||
      differentSeconds <= 90;

    if (isPreviousSetSimilar) {
      const lastGroup = setGroups[setGroups.length - 1];
      setGroups[setGroups.length - 1] = [...lastGroup, currentSet];
    } else {
      setGroups.push([currentSet]);
    }
  }

  return setGroups;
};

const isSuperSet = (sets: ExerciseSet[]) => {
  if (sets.length <= 1) return false;
  return sets
    .slice(1)
    .some((set) => !isSameExercise(set.exercise, sets[0].exercise));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isValid,
  isSameExercise,
  groupWorkouts,
  isSuperSet,
};
