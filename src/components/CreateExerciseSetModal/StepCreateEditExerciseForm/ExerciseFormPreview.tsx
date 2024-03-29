import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import { createEditExerciseRecordAtom } from "../../../atoms/CreateEditExerciseRecordAtom";
import { CreateExerciseStep } from "./types";
import SetItem from "../../WorkoutOfDayList/SetItem";
import { ExerciseSetRecord } from "../../../database/ExerciseDatabase";
import { progressiveFormContext } from "../../ProgressiveForm/context";

export default function ExerciseFormPreview() {
  const { step } = useContext(progressiveFormContext);
  const createExerciseAtomValue = useRecoilValue(createEditExerciseRecordAtom);
  const { exercise, repetitions } = createExerciseAtomValue;

  const isExerciseDefined = !!exercise.name;

  if (!isExerciseDefined || step <= CreateExerciseStep.Name) return null;

  const previewSet: ExerciseSetRecord = {
    exercise,
    repetitions,
    id: "preview",
    date: Date.now(),
  };

  return <SetItem preview set={previewSet} index={-1} properties={[]} />;
}
