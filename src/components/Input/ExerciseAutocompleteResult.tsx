import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import { EquipmentIcon, Exercise, ExerciseDetail } from "../../types/Exercise";
import StringUtils from "../../utils/String";
import ImageViewer from "../ImageViewer";

type Props = {
  exercise: Exercise;
};

export default function ExerciseAutocompleteResult({ exercise }: Props) {
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetail | undefined>(undefined);

  useEffect(() => {
    ExerciseDatabase.findExerciseDetails(exercise).then(setExerciseDetails);
  }, [exercise]);

  return (
    <div className="flex self-center items-center">
      <ImageViewer className="h-10" image={exerciseDetails?.image ?? null} />
      <div className="flex flex-1 flex-col">
        <div className="font-bold text-sm col-span-5">{exercise.name}</div>
        <span className="text-xs col-span-full leading-4">
          {StringUtils.normalizeSnakeCase(exercise.exerciseMode)}
        </span>
      </div>
      <FontAwesomeIcon
        icon={EquipmentIcon[exercise.equipment]}
        className="w-14"
      />
    </div>
  );
}
