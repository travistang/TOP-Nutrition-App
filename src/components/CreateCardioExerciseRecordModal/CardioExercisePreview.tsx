import React from "react";
import {
  CardioExercise,
  CardioExerciseTypeIcon,
} from "../../types/CardioExercise";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  record: CardioExercise;
  className?: string;
};
export default function CardioExercisePreview({ className, record }: Props) {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      <FontAwesomeIcon
        icon={CardioExerciseTypeIcon[record.type]}
        className="w-6 h-6"
      />
      <span className="capitalize font-bold text-sm">{record.type}</span>
    </div>
  );
}
