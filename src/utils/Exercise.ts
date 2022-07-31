import { Exercise } from "../types/Exercise";
import ArrayUtils from "./Array";

const isValid = (exercise: Exercise) =>
  !!exercise.name && exercise.workingBodyParts.length > 0;

const isSameExercise = (a: Exercise, b: Exercise) => {
  a.name === b.name &&
    a.exerciseMode === b.exerciseMode &&
    a.equipment === b.equipment &&
    ArrayUtils.isEqual(a.workingBodyParts, b.workingBodyParts);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isValid,
  isSameExercise,
};
