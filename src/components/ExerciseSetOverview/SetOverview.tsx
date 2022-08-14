import { format } from "date-fns";
import React from "react";
import { ExerciseSet } from "../../types/Exercise";
import RepetitionUtils from "../../utils/Repetition";

type Props = {
  set: ExerciseSet;
};
export default function SetOverview({ set }: Props) {
  return (
    <div className="grid grid-cols-6 px-2 h-8 items-center">
      <span>{format(set.date, "HH:mm")}</span>
      <span className="text-right text-xs font-bold">
        {set.repetitions.weight}kg
      </span>
      <span className="text-center text-xs">x</span>
      <span className="text-right font-bold text-xs">
        {set.repetitions.count} reps
      </span>
      <span className="font-bold text-xs text-right col-start-5 col-span-2">
        {RepetitionUtils.volume(set.repetitions)} kg x reps
      </span>
    </div>
  );
}
