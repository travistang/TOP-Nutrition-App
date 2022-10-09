import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import ProgressiveForm from "../../ProgressiveForm";
import {
  ProgressiveFormConfig,
  ProgressiveFormContextValue,
} from "../../ProgressiveForm/context";
import ExerciseFormPreview from "./ExerciseFormPreview";

import { computeInitialStep, getNextStep } from "./stepLogic";
import { useRestartWithNewSetOption } from "./NewSetContext";
import { steps } from "./stepConfig";


export default function StepCreateEditExerciseForm() {
  const [exerciseSetValue, setExerciseSetValue] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const restartWithNewSetOption = useRestartWithNewSetOption({
    record: exerciseSetValue,
    setExerciseRecord: setExerciseSetValue,
  });
  const isEditing = !!exerciseSetValue.id;

  const closeModal = () => {
    setExerciseSetValue((value) => ({ ...value, modalOpened: false }));
  };

  const onSubmit = async (contextValue: ProgressiveFormContextValue) => {
    const { id, exercise, repetitions, date } = exerciseSetValue;
    if (isEditing) {
      await ExerciseDatabase.updateRecord(id!, exercise, repetitions, date);
      toast.success("Record updated");
      closeModal();
    } else {
      await ExerciseDatabase.addRecord(exercise, repetitions, date);
      toast.success("Record added");
      restartWithNewSetOption(contextValue.goToStep);
    }
  };

  const progressiveFormConfig: ProgressiveFormConfig = {
    steps,
    onSubmit,
    nextStep: (step: number) => getNextStep(step, exerciseSetValue),
  };

  const initialStep = computeInitialStep(exerciseSetValue);
  return (
    <ProgressiveForm
      initialStep={initialStep}
      config={progressiveFormConfig}
      className="min-h-[50vh]">
      <ExerciseFormPreview />
    </ProgressiveForm>
  );
}
