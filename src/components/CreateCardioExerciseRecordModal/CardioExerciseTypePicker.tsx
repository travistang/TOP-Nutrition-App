import React from "react";
import classNames from "classnames";
import {
  CardioExerciseType,
  CardioExerciseTypeIcon,
} from "../../types/CardioExercise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
  selectedType: CardioExerciseType;
  onSelect: (type: CardioExerciseType) => void;
};
export default function CardioExerciseTypePicker({
  className,
  selectedType,
  onSelect,
}: Props) {
  return (
    <div
      className={classNames(
        "grid grid-cols-[repeat(3,minmax(6rem,1fr))] grid-flow-row gap-4",
        className
      )}
    >
      <span className="col-span-full text-xs">Choose an exercise:</span>
      {Object.values(CardioExerciseType).map((type) => (
        <div
          key={type}
          onClick={() => onSelect(type)}
          className={classNames(
            "col-span-1 cursor-pointer rounded-lg h-24 flex items-center justify-center flex-col gap-2 text-gray-200 text-sm",
            selectedType === type ? "bg-gray-800" : "bg-gray-400"
          )}
        >
          <FontAwesomeIcon
            icon={CardioExerciseTypeIcon[type]}
            className="w-12 h-12 child:fill-gray-200"
          />
          {type}
        </div>
      ))}
    </div>
  );
}
