import { CreateEditExerciseRecordProps } from "../../../atoms/CreateEditExerciseRecordAtom";
import { Equipment } from "../../../types/Exercise";
import { CreateExerciseStep } from "./types";

export const computeInitialStep = (
  exerciseValue: CreateEditExerciseRecordProps
) => {
  const { exercise, id } = exerciseValue;
  if (!!id || exercise.workingBodyParts.length !== 0) return CreateExerciseStep.Weight;
  return CreateExerciseStep.Name;
}

const canProceedToNextStep = (
  step: CreateExerciseStep,
  exerciseValue: CreateEditExerciseRecordProps
) => {
  switch (step) {
    case CreateExerciseStep.Name:
      return !!exerciseValue.exercise.name;
    case CreateExerciseStep.BodyPart:
      return !!exerciseValue.exercise.workingBodyParts.length;
    case CreateExerciseStep.Weight:
      return exerciseValue.repetitions.weight > 1;
    case CreateExerciseStep.Repetition:
      return exerciseValue.repetitions.count > 0;
    default:
      return true;
  }
};

export const getNextStep = (
  step: CreateExerciseStep,
  exerciseValue: CreateEditExerciseRecordProps
) => {
  if (!canProceedToNextStep(step, exerciseValue)) return null;
  switch (step) {
    case CreateExerciseStep.Name:
      if (!exerciseValue.exercise.workingBodyParts.length) {
        return CreateExerciseStep.BodyPart;
      }
      if (exerciseValue.exercise.equipment === Equipment.BodyWeight) {
        return CreateExerciseStep.Repetition;
      }
      if (!!exerciseValue.id) {
        return CreateExerciseStep.Weight;
      }
      return CreateExerciseStep.Type;
    case CreateExerciseStep.Type:
      if (exerciseValue.exercise.equipment === Equipment.BodyWeight) {
        return CreateExerciseStep.Repetition;
      }
      return CreateExerciseStep.Weight;
    default:
      return step + 1;
  }
};
