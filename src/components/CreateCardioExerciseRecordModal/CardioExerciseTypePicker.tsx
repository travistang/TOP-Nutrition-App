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
        "grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] grid-flow-row gap-4",
        className
      )}
    >
      {Object.values(CardioExerciseType).map((type) => (
        <div
          key={type}
          onClick={() => onSelect(type)}
          className={classNames(
            "cursor-pointer rounded-lg min-w-32 h-32 flex items-center justify-center flex-col gap-2 text-gray-200 text-sm",
            selectedType === type ? "bg-carbohydrates" : "bg-gray-500"
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
