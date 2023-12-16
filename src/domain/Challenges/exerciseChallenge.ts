import { Exercise, ExerciseSet } from "../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeMode,
  ExerciseChallengeType,
  ExerciseConstraint,
} from "../../types/ExerciseChallenge";
import RepetitionUtils from "../../utils/Repetition";

export const isExerciseUnderConstraint = (
  exercise: Exercise,
  constraint: ExerciseConstraint
) => {
  if (constraint.name !== exercise.name) return false;
  if (constraint.equipment && exercise.equipment !== constraint.equipment)
    return false;
  if (
    constraint.exerciseMode &&
    exercise.exerciseMode !== constraint.exerciseMode
  )
    return false;
  return true;
};

const createComparePredicateFromMode = (
  mode: ExerciseChallengeMode
): ((a: number, b: number) => boolean) => {
  switch (mode) {
    case ExerciseChallengeMode.GreaterThan:
      return (a, b) => a > b;
    case ExerciseChallengeMode.LessThan:
      return (a, b) => a < b;
    case ExerciseChallengeMode.GreaterThanOrEqualTo:
      return (a, b) => a >= b;
    case ExerciseChallengeMode.LessThanOrEqualTo:
      return (a, b) => a <= b;
  }
};

export const isSetFulfillChallenge = (
  set: ExerciseSet,
  challenge: ExerciseChallenge
) => {
  if (!isExerciseUnderConstraint(set.exercise, challenge.exerciseConstraint))
    return false;
  const { type, typeSpecificValue, target } = challenge;
  const compareFn = createComparePredicateFromMode(challenge.mode);
  switch (type) {
    case ExerciseChallengeType.NumberOfSets:
    case ExerciseChallengeType.TotalRepetitions:
    case ExerciseChallengeType.TotalVolume:
      return true;
    case ExerciseChallengeType.SetsOfRepetition:
      return compareFn(typeSpecificValue || 0, set.repetitions.count);
    case ExerciseChallengeType.SetsOfWeight:
      return compareFn(typeSpecificValue || 0, set.repetitions.weight);
  }
};

export const getAchievedValueFromSet = (
  set: ExerciseSet,
  challenge: ExerciseChallenge
): number => {
  if (!isSetFulfillChallenge(set, challenge)) return 0;
  switch (challenge.type) {
    case ExerciseChallengeType.NumberOfSets:
    case ExerciseChallengeType.SetsOfRepetition:
    case ExerciseChallengeType.SetsOfWeight:
      return 1;
    case ExerciseChallengeType.TotalVolume:
      return RepetitionUtils.volume(set.repetitions);
    case ExerciseChallengeType.TotalRepetitions:
      return set.repetitions.count;
  }
};
