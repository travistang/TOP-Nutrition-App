import React from "react";
import classNames from "classnames";
import { CardioExerciseRecord } from "../../database/ExerciseDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CardioExerciseType,
  CardioExerciseTypeIcon,
} from "../../types/CardioExercise";
import TextWithUnit from "../TextWithUnit";
import useCardioExerciseMutation from "../../atoms/CreateEditCardioExerciseRecordAtom";
import Button, { ButtonStyle } from "../Input/Button";

const CardioSupplementaryText = ({
  cardio,
}: {
  cardio: CardioExerciseRecord;
}) => {
  if (cardio.type === CardioExerciseType.Hiking) {
    return (
      <TextWithUnit
        size="sm"
        value={cardio.elevation}
        unit="hm"
        unitClassName="text-xs"
        className="mt-1 text-xs"
      />
    );
  }
  if (cardio.type === CardioExerciseType.Running) {
    return <TextWithUnit size="sm" value={cardio.distanceKm} unit="km" />;
  }
  return null;
};

type Props = {
  className?: string;
  cardio: CardioExerciseRecord;
};
export default function CardioEntry({ cardio, className }: Props) {
  const { onEdit } = useCardioExerciseMutation();

  return (
    <div
      className={classNames(
        "flex items-center gap-2 overflow-x-hidden",
        className
      )}
    >
      <FontAwesomeIcon
        icon={CardioExerciseTypeIcon[cardio.type]}
        className="w-4 h-4"
      />
      <div className="flex flex-col leading-3 flex-1 overflow-hidden">
        <div className="font-bold text-sm flex items-center gap-1">
          {cardio.type}
          {cardio.type === CardioExerciseType.Hiking && (
            <span className="whitespace-nowrap overflow-ellipsis text-xs opacity-70 overflow-hidden">
              - {cardio.tripName}
            </span>
          )}
        </div>
        <CardioSupplementaryText cardio={cardio} />
      </div>
      <TextWithUnit
        value={cardio.durationMinutes}
        integer
        unit="minutes"
        unitClassName="text-xs"
        className="text-xs"
      />
      <Button
        buttonStyle={ButtonStyle.Clear}
        className="w-8 h-8"
        icon="pen"
        onClick={() => onEdit(cardio)}
      />
    </div>
  );
}
