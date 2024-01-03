import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from "date-fns";
import { BodyPart, Equipment, Exercise, ExerciseSet } from "../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeInterval,
  ExerciseChallengeMode,
  ExerciseChallengeType,
  ExerciseConstraint,
} from "../../types/ExerciseChallenge";
import RepetitionUtils from "../../utils/Repetition";
import NumberUtils from "../../utils/Number";

export const isExerciseUnderConstraint = (
  exercise: Exercise,
  constraint: ExerciseConstraint
) => {
  if (constraint.name && constraint.name !== exercise.name) return false;
  if (
    constraint.equipments.length &&
    !constraint.equipments.includes(exercise.equipment)
  )
    return false;
  if (
    constraint.modes.length &&
    !constraint.modes.includes(exercise.exerciseMode)
  )
    return false;
  if (
    constraint.workingBodyParts.length &&
    !constraint.workingBodyParts.some((part) =>
      exercise.workingBodyParts.includes(part)
    )
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
  const { type, typeSpecificValue } = challenge;
  const compareFn = createComparePredicateFromMode(challenge.mode);
  switch (type) {
    case ExerciseChallengeType.NumberOfSets:
    case ExerciseChallengeType.TotalRepetitions:
    case ExerciseChallengeType.TotalVolume:
      return true;
    case ExerciseChallengeType.SetsOfRepetition:
      return compareFn(set.repetitions.count, typeSpecificValue || 0);
    case ExerciseChallengeType.SetsOfWeight:
      return compareFn(set.repetitions.weight, typeSpecificValue || 0);
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

export const getTimeFromInterval = (
  interval: ExerciseChallengeInterval,
  time: number,
): [number, number] => {
  let intervalStart = Date.now(), intervalEnd = Date.now();
  switch (interval) {
    case ExerciseChallengeInterval.Daily:
      intervalEnd = endOfDay(time).getTime();
      intervalStart = startOfDay(time).getTime();
      break;
    case ExerciseChallengeInterval.Weekly:
      intervalEnd = endOfWeek(time).getTime();
      intervalStart = startOfWeek(time).getTime();
      break;
    case ExerciseChallengeInterval.Monthly:
      intervalEnd = endOfMonth(time).getTime();
      intervalStart = startOfMonth(time).getTime();
      break;
  }
  return [intervalStart, intervalEnd];
};

export const getChallengeIntervals = (interval: ExerciseChallengeInterval, time: number, numInterval: number): [number, number][] => {
  const timeInIntervalFunc = {
    [ExerciseChallengeInterval.Daily]: subDays,
    [ExerciseChallengeInterval.Weekly]: subWeeks,
    [ExerciseChallengeInterval.Monthly]: subMonths,
  }[interval];
  
  return NumberUtils.range(numInterval).map((n) => {
    const timeInNthInterval = timeInIntervalFunc(time, n).getTime();
    return getTimeFromInterval(interval, timeInNthInterval);
  })
}

export const createChallengeTypeText = (challenge: ExerciseChallenge) => {
  const { type, target, typeSpecificValue } = challenge;
  switch (type) {
    case ExerciseChallengeType.SetsOfWeight:
      return `${target} set(s) of eligible exercises with ${typeSpecificValue} kg or more`;
    case ExerciseChallengeType.SetsOfRepetition:
      return `${target} set(s) of eligible exercises with ${typeSpecificValue} reps or more`;
    case ExerciseChallengeType.NumberOfSets:
      return `${target} set(s) of eligible exercises`;
    case ExerciseChallengeType.TotalRepetitions:
      return `${target} reps of eligible exercises`;
    case ExerciseChallengeType.TotalVolume:
      return `a total volume of ${target} kg x reps of eligible exercises`;

  }
  return ``
}

export const challengeComparisonText = (mode: ExerciseChallengeMode) => {
  switch (mode) {
    case ExerciseChallengeMode.GreaterThan:
      return 'more than';
    case ExerciseChallengeMode.GreaterThanOrEqualTo:
      return 'at least';
    case ExerciseChallengeMode.LessThan:
      return 'less than';
    case ExerciseChallengeMode.LessThanOrEqualTo:
      return 'at most';
  }
}

const equipmentConstraintText = (equipments: Equipment[]) => {
  if (equipments.length === 0 || equipments.length === Object.values(Equipment).length) return 'any equipments';
  if (equipments.length === 1) return equipments[0].toString();
  const [firstEquipment, ...remainingEquipments] = equipments;
  return `any of ${remainingEquipments.join(',')} or ${firstEquipment}`;
}
export const challengeConstraintText = (constraint: ExerciseConstraint) => {
  const { name, workingBodyParts, equipments } = constraint;
  const nameString = name || "any exercises";
  const bodyPartString = workingBodyParts.length === Object.values(BodyPart).length ? 'any body parts' : `working on ${workingBodyParts.join(',')}`;
  return `${nameString} ${bodyPartString} using ${equipmentConstraintText(equipments)}`;
}
