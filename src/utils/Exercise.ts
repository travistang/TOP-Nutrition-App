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
  if (sets.length === 0) return [];
  for (let i = 0; i < sets.length; i++) {
    if (i === sets.length - 1) return [sets];
    const currentSet = sets[i],
      nextSet = sets[i + 1],
      differentSeconds = differenceInSeconds(nextSet.date, currentSet.date);
    const isNextSetSimilar =
      isSameExercise(nextSet.exercise, currentSet.exercise) ||
      differentSeconds <= 90;

    if (!isNextSetSimilar) {
      return [sets.slice(0, i), ...groupWorkouts(sets.slice(i))];
    }
  }
  return [sets];
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
