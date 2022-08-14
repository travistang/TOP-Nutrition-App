import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import { EquipmentIcon, ExerciseSet } from "../../types/Exercise";
import ExerciseUtils from "../../utils/Exercise";
import RepetitionUtils from "../../utils/Repetition";
import SetOverview from "./SetOverview";

type Props = {
  sets: ExerciseSet[];
};
export default function ExerciseSetOverview({ sets }: Props) {
  const isSuperSet = ExerciseUtils.isSuperSet(sets);
  const exerciseName = isSuperSet ? "Super set" : sets[0].exercise.name;

  return (
    <div className="flex flex-col rounded-lg shadow-lg items-stretch">
      <div className="h-12 grid grid-cols-6 bg-gray-400 items-center rounded-t-lg shadow-lg sticky top-0 p-2">
        <span className="text-xs font-bold col-span-3">{exerciseName}</span>
        {!isSuperSet && (
          <FontAwesomeIcon
            icon={EquipmentIcon[sets[0].exercise.equipment]}
            className="col-span-1 col-start-6"
          />
        )}
      </div>
      {sets.map((set) => (
        <SetOverview set={set} />
      ))}
    </div>
  );
}
