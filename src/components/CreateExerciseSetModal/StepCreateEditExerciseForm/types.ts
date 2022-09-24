import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum CreateExerciseStep {
  Name = 0,
  BodyPart = 1,
  Type = 2,
  Weight = 3,
  Repetition = 4,
  Time = 5,
}

export const CreateExerciseStepIconMap: Record<CreateExerciseStep, IconProp> = {
  [CreateExerciseStep.Name]: "tag",
  [CreateExerciseStep.BodyPart]: "puzzle-piece",
  [CreateExerciseStep.Type]: "dumbbell",
  [CreateExerciseStep.Weight]: "weight-hanging",
  [CreateExerciseStep.Repetition]: "refresh",
  [CreateExerciseStep.Time]: "clock",
};

export type StepFormProps = {
  step: CreateExerciseStep;
  onGotoStep: (step: CreateExerciseStep) => void;
};
