import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EquipmentIcon, Exercise } from "../../types/Exercise";
import StringUtils from "../../utils/String";

type Props = {
  exercise: Exercise;
};

export default function ExerciseAutocompleteResult({ exercise }: Props) {
  return (
    <div className="flex self-center items-center">
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
