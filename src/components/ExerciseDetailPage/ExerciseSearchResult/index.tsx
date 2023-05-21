import React, { useCallback } from "react";
import { Exercise } from "../../../types/Exercise";
import Section from "../../Section";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import ImagePicker from "../../Input/ImagePicker";
import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "react-hot-toast";

type Props = {
  exercise: Exercise;
};
export default function ExerciseSearchResult({ exercise }: Props) {
  const exerciseDetail = useLiveQuery(() => {
    return ExerciseDatabase.findOrCreateExerciseDetails(exercise);
  }, [exercise]);

  const onChooseImage = useCallback(
    (image: Blob | null) => {
      if (!exerciseDetail) return;
      const newExerciseDetails = {
        ...exerciseDetail,
        image: image ?? undefined,
      };
      ExerciseDatabase.updateExerciseDetails(newExerciseDetails)
        .then(() => {
          toast.success("Exercise details updated");
        })
        .catch(() => {
          toast.error("Failed to update exercise details");
        });
    },
    [exerciseDetail]
  );

  return (
    <>
      <Section label="Exercise information" className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex-1">{exercise.name}</h3>
          <ImagePicker
            className="w-16 h-16"
            image={exerciseDetail?.image ?? null}
            onChange={onChooseImage}
          />
        </div>
      </Section>
    </>
  );
}
