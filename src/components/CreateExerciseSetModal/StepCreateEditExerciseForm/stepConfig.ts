import EquipmentForm from "./EquipmentForm";
import ExerciseBodyPartForm from "./ExerciseBodyPartForm";
import ExerciseNameAndTypeForm from "./ExerciseNameAndTypeForm";
import RepetitionInputGroup from "./RepetitionInputGroup";
import TimeForm from "./ExerciseTimeForm";
import { CreateExerciseStep, CreateExerciseStepIconMap } from "./types";
import { ProgressiveFormStep } from "../../ProgressiveForm/context";

export const FormComponentMap: Record<CreateExerciseStep, React.FC<any>> = {
  [CreateExerciseStep.Name]: ExerciseNameAndTypeForm,
  [CreateExerciseStep.BodyPart]: ExerciseBodyPartForm,
  [CreateExerciseStep.Type]: EquipmentForm,
  [CreateExerciseStep.Weight]: RepetitionInputGroup,
  [CreateExerciseStep.Repetition]: RepetitionInputGroup,
  [CreateExerciseStep.Time]: TimeForm,
};

export const steps: ProgressiveFormStep[] = Object.values(CreateExerciseStep)
  .filter((n) => !Number.isNaN(parseInt(n as string)))
  .map((step) => ({
    icon: CreateExerciseStepIconMap[step as CreateExerciseStep],
    formComponent: FormComponentMap[step as CreateExerciseStep],
    key: step.toString(),
  }));
