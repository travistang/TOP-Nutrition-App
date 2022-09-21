import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum CreateExerciseStep {
  Name,
  Type,
  Weight,
  Repetition,
  Time
}

export const CreateExerciseStepIconMap: Record<CreateExerciseStep, IconProp> = {
  [CreateExerciseStep.Name]: "tag",
  [CreateExerciseStep.Type]: "dumbbell",
  [CreateExerciseStep.Weight]: "weight-hanging",
  [CreateExerciseStep.Repetition]: "refresh",
  [CreateExerciseStep.Time]: "clock",
};

export type StepFormProps = {
  step: CreateExerciseStep;
  onGotoStep: (step: CreateExerciseStep) => void;
};

