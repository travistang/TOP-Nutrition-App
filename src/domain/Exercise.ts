import { differenceInSeconds } from "date-fns";
import { ExerciseSetRecord } from "../database/ExerciseDatabase";
import ExerciseUtils from '../utils/Exercise';
import ArrayUtils from '../utils/Array';

const areSetTimeClose = (a: ExerciseSetRecord, b: ExerciseSetRecord) =>
  Math.abs(differenceInSeconds(a.date, b.date)) <= 60;
const WARMUP_SET_MAX_INDEX = 2;

const detectDropSets = (sets: ExerciseSetRecord[]): number[] => {
  const dropsetIndices: number[] = [];
  sets.forEach((currentSet, index) => {
    const previousSetIndex = index - 1;
    const previousSet = sets[previousSetIndex];

    if (!previousSet) return;
    if (ExerciseUtils.isOneSided(currentSet.exercise)) return;

    const setTimeSimilar = areSetTimeClose(currentSet, previousSet);
    const isSameExercise = ExerciseUtils.isSameExercise(currentSet.exercise, previousSet.exercise);
    const isLessWeight = currentSet.repetitions.weight < previousSet.repetitions.weight;

    const isDropSet = setTimeSimilar && isSameExercise && isLessWeight;
    if (isDropSet) {
      dropsetIndices.push(index);
    }
  });

  return dropsetIndices;
};

const detectSuperSets = (sets: ExerciseSetRecord[]): number[] => {
  const supersetIndices: number[] = [];

  sets.forEach((currentSet, index) => {
    const previousSetIndex = index - 1;
    const previousSet = sets[previousSetIndex];
    if (!previousSet) return;

    const setTimeSimilar = areSetTimeClose(currentSet, previousSet);
    const isSameExercise = ExerciseUtils.isSameExercise(
      currentSet.exercise,
      previousSet.exercise
    );

    const isSuperSet = setTimeSimilar && !isSameExercise;
    if (isSuperSet) {
      supersetIndices.push(index);
    }
  })
  return supersetIndices;
}

const detectWarmupSets = (sets: ExerciseSetRecord[]): number[] => {
  const warmupsetIndices: number[] = [];
  ArrayUtils.range(WARMUP_SET_MAX_INDEX).reverse().forEach(index => {
    const nextSetIndex = index + 1;
    const currentSet = sets[index];
    const nextSet = sets[nextSetIndex];

    if (!nextSet) return;

    const isSameExercise = ExerciseUtils.isSameExercise(
      currentSet.exercise,
      nextSet.exercise
    );

    if (!isSameExercise) return;

    const isNextSetWarmupSet = warmupsetIndices.includes(nextSetIndex);
    const nextSetHasMuchHigherWeight = nextSet.repetitions.weight * 0.6 >= currentSet.repetitions.weight;
    if (nextSetHasMuchHigherWeight || isNextSetWarmupSet) {
      warmupsetIndices.push(index);
    }
  });

  return warmupsetIndices;

}

const detectWorkoutEnd = (sets: ExerciseSetRecord[]): number[] => {
  const workoutEndIndices: number[] = [];

  sets.forEach((currentSet, index) => {
    const nextSetIndex = index + 1;
    const nextSet = sets[nextSetIndex];
    if (!nextSet) {
      workoutEndIndices.push(index);
      return;
    };

    const setTimeSimilar = areSetTimeClose(currentSet, nextSet);
    const isSameExercise = ExerciseUtils.isSameExercise(
      currentSet.exercise, nextSet.exercise
    );

    const isSetEnd = !isSameExercise && !setTimeSimilar;

    if (isSetEnd) {
      workoutEndIndices.push(index);
    }
  });

  return workoutEndIndices;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  detectDropSets,
  detectSuperSets,
  detectWarmupSets,
  detectWorkoutEnd,
};