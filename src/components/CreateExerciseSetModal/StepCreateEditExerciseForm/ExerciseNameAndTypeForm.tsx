import { useRecoilState } from "recoil";
import React, { KeyboardEvent, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ExerciseNameInput from "../ExerciseNameInput";
import { progressiveFormContext } from "../../ProgressiveForm/context";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import Button, { ButtonStyle } from "../../Input/Button";
import SmallNotice from "../../SmallNotice";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import { CreateExerciseStep } from "./types";

export default function ExerciseNameAndTypeForm() {
  const { nextStep, goToStep } = useContext(progressiveFormContext);
  const [{ id }, setExerciseAtomValue] = useRecoilState(
    createEditExerciseRecordAtom
  );
  const isEditing = !!id;
  const exerciseInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => exerciseInputRef.current?.focus(), []);

  const handleExerciseNameInputKey = (keyEvent: KeyboardEvent) => {
    if (!exerciseInputRef.current?.value) return;
    if (keyEvent.key.toLowerCase() === "enter") {
      nextStep();
    }
  };

  const nextStepFromKnownExercise = () => {
    goToStep(CreateExerciseStep.Weight);
  };

  const deleteRecord = async () => {
    if (!id) return;
    try {
      await ExerciseDatabase.deleteRecord(id);
      toast.success("Record deleted");
      setExerciseAtomValue((atom) => ({ ...atom, modalOpened: false }));
    } catch {
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      {isEditing && (
        <div className="flex items-center justify-between">
          <SmallNotice icon="info-circle">
            You are editing an existing record
          </SmallNotice>
          <Button
            icon="trash"
            text="Delete"
            textClassName="text-red-500 child:fill-red-500"
            buttonStyle={ButtonStyle.Clear}
            onClick={deleteRecord}
          />
        </div>
      )}
      <ExerciseNameInput
        showDefaultSuggestions
        inputRef={exerciseInputRef}
        onSelected={nextStepFromKnownExercise}
        onKeyDown={handleExerciseNameInputKey}
      />
    </div>
  );
}
