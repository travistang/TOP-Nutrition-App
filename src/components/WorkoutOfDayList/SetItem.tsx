import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import {
  EquipmentIcon,
  ExerciseModeIcon,
  ExerciseSetType,
} from "../../types/Exercise";

type Props = {
  index?: number;
  set: ExerciseSetRecord;
  properties: ExerciseSetType[];
  preview?: boolean;
  className?: string;
};

const getIndexText = (
  index: number,
  properties: ExerciseSetType[],
  preview?: boolean
): string => {
  if (preview) return "preview";

  if (properties.includes(ExerciseSetType.Dropset)) {
    return "dropset";
  }

  if (properties.includes(ExerciseSetType.Superset)) {
    return "superset";
  }

  return `#${index + 1}`;
};
export default function SetItem({
  set,
  index,
  properties,
  preview,
  className,
}: Props) {
  const setEditingExerciseItem = useSetRecoilState(
    createEditExerciseRecordAtom
  );

  const viewExercise = useCallback(
    (readonly: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (preview) return;

      setEditingExerciseItem({
        ...set,
        readonly,
        date: new Date(set.date),
        modalOpened: true,
      });
    },
    [preview, set, setEditingExerciseItem]
  );

  return (
    <>
      <div
        onClick={viewExercise(true)}
        className={classNames(
          "grid grid-cols-12 gap-1 items-center py-2",
          properties.includes(ExerciseSetType.Warmup) && "opacity-70",
          className
        )}
      >
        {index !== undefined && (
          <span className="capitalize col-span-2 text-xs font-bold flex items-center justify-center">
            {getIndexText(index, properties, preview)}
          </span>
        )}
        <span className="h-min col-span-2 text-xs font-bold flex items-center justify-center text-gray-200 mx-2">
          <FontAwesomeIcon
            icon={EquipmentIcon[set.exercise.equipment]}
            className="w-4 h-4 mr-4"
          />
        </span>
        <div className="col-span-4 overflow-hidden flex flex-col items-stretch gap-1">
          <span className="text-sm font-bold flex items-center flex-nowrap text-ellipsis">
            {set.exercise.name}
          </span>
          <span className="opacity-75 text-xs flex items-center gap-2">
            <FontAwesomeIcon
              icon={ExerciseModeIcon[set.exercise.exerciseMode]}
              className="w-3 h-3"
            />
            x{set.repetitions.count}
          </span>
        </div>
        <div className="col-span-2 flex text-right flex-col items-stretch">
          <span className="text-sm font-bold">{set.repetitions.weight} kg</span>
        </div>
        <div
          onClick={viewExercise(false)}
          className={classNames(
            "col-span-2 flex items-center justify-center",
            preview && "hidden"
          )}
        >
          <FontAwesomeIcon icon="pen" />
        </div>
      </div>
    </>
  );
}
