import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import { Exercise, ExerciseDetail } from "../../../types/Exercise";
import ImagePicker from "../../Input/ImagePicker";
import Section from "../../Section";

type Props = {
  exercise: Exercise;
};
export default function ExerciseSearchResult({ exercise }: Props) {
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDetail | undefined>(undefined);
  useEffect(() => {
    ExerciseDatabase.findExerciseDetails(exercise).then(setExerciseDetail);
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
