import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EquipmentIcon, ExerciseSet } from "../../types/Exercise";
import ExerciseUtils from "../../utils/Exercise";
import SetOverview from "./SetOverview";

type Props = {
  sets: ExerciseSet[];
};
export default function ExerciseSetOverview({ sets }: Props) {
  const isSuperSet = ExerciseUtils.isSuperSet(sets);
  const exerciseName = isSuperSet ? "Super set" : sets[0].exercise.name;

  return (
    <div className="flex flex-col rounded-lg shadow-lg items-stretch mt-2">
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
        <SetOverview key={set.id} set={set} />
      ))}
    </div>
  );
}
