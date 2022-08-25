import { differenceInSeconds, format } from "date-fns";
import { ExerciseSetRecord } from "../database/ExerciseDatabase";
import { BodyPart, Exercise, ExerciseDayType, ExerciseSet, OneSidedExerciseMode } from "../types/Exercise";
import NumberUtils from "./Number";
import ArrayUtils from "./Array";
import RepetitionUtils from './Repetition';

const isValid = (exercise: Exercise) =>
  !!exercise.name && exercise.workingBodyParts.length > 0;

const isOneSided = (exercise: Exercise) => OneSidedExerciseMode.includes(exercise.exerciseMode);
const isSameExercise = (a: Exercise, b: Exercise) =>
  a.name === b.name &&
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

const groupWorkoutsByDate = <T extends ExerciseSet>(sets: T[]): Record<string, T[]> => {
  const grouping: Record<string, T[]> = {};
  for (const set of sets) {
    const dateString = format(new Date(set.date), 'dd/MM/yyyy');
    grouping[dateString] = [...(grouping[dateString] ?? []), set];
  }

  return grouping;
};

const bodyPartsWorked = <T extends ExerciseSet>(sets: T[]): BodyPart[] => {
  const bodyPartSet = new Set<BodyPart>();
  sets.forEach(set => set.exercise.workingBodyParts.forEach(
    bodyPart => bodyPartSet.add(bodyPart)
  ));
  return Array.from(bodyPartSet);
};

const computeExerciseDayType = <T extends ExerciseSet>(sets: T[]): ExerciseDayType => {
  const bodyParts = bodyPartsWorked(sets);
  const isEveryPartInList = (list: BodyPart[]) => {
    return bodyParts.every(part => list.includes(part));
  };

  if (isEveryPartInList([BodyPart.Triceps, BodyPart.Shoulders, BodyPart.Chest])) {
    return ExerciseDayType.Push;
  }

  if (isEveryPartInList([BodyPart.Biceps, BodyPart.Back])) {
    return ExerciseDayType.Pull;
  }

  if (isEveryPartInList([BodyPart.Biceps, BodyPart.Triceps])) {
    return ExerciseDayType.Arm;
  }

  if (bodyParts.find(part => part === BodyPart.Legs)) {
    return ExerciseDayType.Leg;
  }

  return ExerciseDayType.Mixed;
};

const filterWorkoutsWithExercise = (workouts: ExerciseSetRecord[], exercise: Exercise) => {
  return workouts.filter(workout => isSameExercise(workout.exercise, exercise));
};

const totalVolume = (workouts: ExerciseSetRecord[]) => {
  return workouts.map(workout => RepetitionUtils.volume(workout.repetitions)).reduce((totalVolume, volume) => totalVolume + volume, 0);
};

const totalRepetitions = (workouts: ExerciseSetRecord[]) => {
  return NumberUtils.sum(...workouts.map(workout => workout.repetitions.count));
}
const averageRepetitions = (workouts: ExerciseSetRecord[]) => {
  return NumberUtils.safeDivide(totalRepetitions(workouts), workouts.length);
}

const averageVolume = (workouts: ExerciseSetRecord[]) => {
  return NumberUtils.safeDivide(totalVolume(workouts), workouts.length);
}

const maxWeight = (workouts: ExerciseSetRecord[]) => {
  return workouts.reduce((maxWeight, workouts) => Math.max(maxWeight, workouts.repetitions.weight), 0);
};
const averageWeight = (workouts: ExerciseSetRecord[]) => {
  return NumberUtils.safeDivide(totalVolume(workouts), totalRepetitions(workouts));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isValid,
  isOneSided,
  isSameExercise,
  groupWorkouts,
  groupWorkoutsByDate,
  bodyPartsWorked,
  computeExerciseDayType,
  filterWorkoutsWithExercise,

  totalVolume,
  averageVolume,

  averageRepetitions,

  maxWeight,
  averageWeight
};
