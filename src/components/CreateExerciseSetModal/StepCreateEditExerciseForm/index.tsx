import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import ProgressiveForm from "../../ProgressiveForm";
import {
  ProgressiveFormConfig,
  ProgressiveFormContextValue,
  ProgressiveFormStep,
} from "../../ProgressiveForm/context";
import EquipmentForm from "./EquipmentForm";
import ExerciseBodyPartForm from "./ExerciseBodyPartForm";
import ExerciseFormPreview from "./ExerciseFormPreview";
import ExerciseNameAndTypeForm from "./ExerciseNameAndTypeForm";
import RepetitionInputGroup from "./RepetitionInputGroup";
import { getNextStep } from "./stepLogic";
import TimeForm from "./ExerciseTimeForm";
import { CreateExerciseStep, CreateExerciseStepIconMap } from "./types";

const FormComponentMap: Record<CreateExerciseStep, React.FC<any>> = {
  [CreateExerciseStep.Name]: ExerciseNameAndTypeForm,
  [CreateExerciseStep.BodyPart]: ExerciseBodyPartForm,
  [CreateExerciseStep.Type]: EquipmentForm,
  [CreateExerciseStep.Weight]: RepetitionInputGroup,
  [CreateExerciseStep.Repetition]: RepetitionInputGroup,
  [CreateExerciseStep.Time]: TimeForm,
};

const steps: ProgressiveFormStep[] = Object.values(CreateExerciseStep)
  .filter((n) => !Number.isNaN(parseInt(n as string)))
  .map((step) => ({
    icon: CreateExerciseStepIconMap[step as CreateExerciseStep],
    formComponent: FormComponentMap[step as CreateExerciseStep],
    key: step.toString(),
  }));

export default function StepCreateEditExerciseForm() {
  const [exerciseSetValue, setExerciseSetValue] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const isEditing = !!exerciseSetValue.id;

  const closeModal = () => {
    setExerciseSetValue((value) => ({ ...value, modalOpened: false }));
  };

  const onSubmit = async (contextValue: ProgressiveFormContextValue) => {
    const { id, exercise, repetitions, date } = exerciseSetValue;
    const { restartOnComplete } = contextValue;
    if (isEditing) {
      await ExerciseDatabase.updateRecord(id!, exercise, repetitions, date);
      toast.success("Record updated");
      closeModal();
    } else {
      await ExerciseDatabase.addRecord(exercise, repetitions, date);
      toast.success("Record added");
      if (!restartOnComplete) {
        closeModal();
      }
    }
  };

  const progressiveFormConfig: ProgressiveFormConfig = {
    steps,
    onSubmit,
    nextStep: (step: number) => getNextStep(step, exerciseSetValue),
  };

  return (
    <ProgressiveForm config={progressiveFormConfig} className="min-h-[50vh]">
      <ExerciseFormPreview />
    </ProgressiveForm>
  );
}
