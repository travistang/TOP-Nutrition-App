import { differenceInSeconds } from "date-fns";
import { ExerciseSetRecord } from "../database/ExerciseDatabase";
import { BodyPart } from "../types/Exercise";
import ArrayUtils from "../utils/Array";
import ExerciseUtils from "../utils/Exercise";
import ObjectUtils from "../utils/Object";
import StringUtils from "../utils/String";

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
    const isSameExercise = ExerciseUtils.isSameExercise(
      currentSet.exercise,
      previousSet.exercise
    );
    const isLessWeight =
      currentSet.repetitions.weight < previousSet.repetitions.weight;

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
  });
  return supersetIndices;
};

const detectWarmupSets = (sets: ExerciseSetRecord[]): number[] => {
  const warmupsetIndices: number[] = [];
  ArrayUtils.range(WARMUP_SET_MAX_INDEX)
    .reverse()
    .forEach((index) => {
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
      const nextSetHasMuchHigherWeight =
        nextSet.repetitions.weight * 0.6 >= currentSet.repetitions.weight;
      if (nextSetHasMuchHigherWeight || isNextSetWarmupSet) {
        warmupsetIndices.push(index);
      }
    });

  return warmupsetIndices;
};

const detectWorkoutEnd = (sets: ExerciseSetRecord[]): number[] => {
  const workoutEndIndices: number[] = [];

  sets.forEach((currentSet, index) => {
    const nextSetIndex = index + 1;
    const nextSet = sets[nextSetIndex];
    if (!nextSet) {
      workoutEndIndices.push(index);
      return;
    }

    const setTimeSimilar = areSetTimeClose(currentSet, nextSet);
    const isSameExercise = ExerciseUtils.isSameExercise(
      currentSet.exercise,
      nextSet.exercise
    );

    const isSetEnd = !isSameExercise && !setTimeSimilar;

    if (isSetEnd) {
      workoutEndIndices.push(index);
    }
  });

  return workoutEndIndices;
};

const detectWorkoutPartFromName = (name: string) => {
  const bodyPartKeywords: Record<BodyPart, string[]> = {
    [BodyPart.Biceps]: ["bicep", "biceps"],
    [BodyPart.Triceps]: ["tricep", "Triceps"],
    [BodyPart.Back]: ["lat", "lats", "back", "row"],
    [BodyPart.Chest]: ["chest"],
    [BodyPart.Shoulders]: ["shoulder", "Shoulders"],
    [BodyPart.Traps]: [],
    [BodyPart.Abs]: ["abs", "core", "abdomen"],
    [BodyPart.Legs]: [
      "calve",
      "calves",
      "leg",
      "legs",
      "quad",
      "glute",
      "hip",
      "hips",
    ],
  };

  const wordList = name.split(" ");
  const partsWithMatchedWords = ObjectUtils.filterValues(
    bodyPartKeywords,
    (keywords) =>
      ArrayUtils.hasSome(wordList, keywords, StringUtils.caseInsensitiveEqual)
  );

  return Object.keys(partsWithMatchedWords) as BodyPart[];
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  detectDropSets,
  detectSuperSets,
  detectWarmupSets,
  detectWorkoutEnd,
  detectWorkoutPartFromName,
};
