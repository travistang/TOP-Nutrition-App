import React from "react";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import NumberUtils from "../../utils/Number";
import ExerciseUtils from "../../utils/Exercise";
import Button, { ButtonStyle } from "../Input/Button";
import ScalarWidget from "../Widgets/ScalarWidget";
import { useSetRecoilState } from "recoil";
import { createEditExerciseRecordAtom } from "../../atoms/CreateEditExerciseRecordAtom";
import { isSameDay } from "date-fns";
import { MarcoNutritionColor } from "../../types/Nutrition";

type Props = {
  noHeader?: boolean;
  recentExercises: ExerciseSetRecord[];
};
export default function RecentExerciseStatistics({
  noHeader,
  recentExercises,
}: Props) {
  const setExerciseAtom = useSetRecoilState(createEditExerciseRecordAtom);
  const addExercise = () => {
    if (recentExercises.length === 0) return;
    const { exercise, repetitions: recentRepetitions } = recentExercises[0];
    setExerciseAtom((atom) => ({
      ...atom,
      readonly: false,
      id: undefined,
      date: new Date(),
      exercise,
      repetitions: recentRepetitions,
    }));
  };
  const recordsGrouppedByDay =
    ExerciseUtils.groupWorkoutsByDate(recentExercises);
  const recordsToday = recentExercises.filter((exercise) =>
    isSameDay(Date.now(), exercise.date)
  );
  const hasRecordsToday = recordsToday.length > 0;
  const exerciseName = recentExercises[0]?.exercise.name ?? "--";
  const maxWeight = ExerciseUtils.maxWeight(recentExercises);
  const maxTotalVolume = NumberUtils.max(
    ...Object.values(recordsGrouppedByDay).map(ExerciseUtils.totalVolume)
  );

  return (
    <div className="grid grid-cols-6 gap-2 bg-gray-200">
      {!noHeader && (
        <>
          <span className="col-span-4">{exerciseName}</span>
          <Button
            onClick={addExercise}
            className="col-span-2 h-10 gap-1"
            textClassName="child:fill-gray-50"
            buttonStyle={ButtonStyle.Block}
            text="Add"
            icon="plus"
          />
        </>
      )}
      <ScalarWidget
        className="col-span-3"
        value={maxTotalVolume}
        label="Max. Total Volume"
        unit="kg x rep"
      />
      <ScalarWidget
        className="col-span-3"
        value={maxWeight}
        label="Max weight"
        unit="kg"
      />
      {hasRecordsToday && (
        <>
          <ScalarWidget
            style={{ backgroundColor: MarcoNutritionColor.carbohydrates }}
            className="col-span-3"
            value={ExerciseUtils.totalVolume(recordsToday)}
            label="Today's total volume"
            unit="kg x rep"
          />
          <ScalarWidget
            style={{ backgroundColor: MarcoNutritionColor.carbohydrates }}
            className="col-span-3"
            value={ExerciseUtils.maxWeight(recordsToday)}
            label="Today's Max weight"
            unit="kg"
          />
        </>
      )}
    </div>
  );
}
