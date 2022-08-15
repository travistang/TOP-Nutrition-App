import React from "react";
import { format } from "date-fns";
import { useSetRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { ExerciseSet } from "../../types/Exercise";
import RepetitionUtils from "../../utils/Repetition";

type Props = {
  set: ExerciseSet;
};
export default function SetOverview({ set }: Props) {
  const setSetOverviewAtom = useSetRecoilState(createEditExerciseRecordAtom);

  const onEdit = () => {
    setSetOverviewAtom(value => ({
      modalOpened: true,
      exercise: set.exercise,
      repetition: set.repetitions,
      date: new Date(set.date),
      id: set.id,
    }));
  }

  return (
    <div onClick={onEdit} className="grid grid-cols-6 px-2 h-8 items-center">
      <span className="text-xs">{format(set.date, "HH:mm")}</span>
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
