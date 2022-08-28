import React from "react";
import { differenceInMinutes } from "date-fns";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import TimerText from "../TimerText";
import SetEntry from "./SetEntry";
import { ExerciseSetType } from "../../types/Exercise";
import ExerciseDomain from "../../domain/Exercise";

type Props = {
  workouts: ExerciseSetRecord[];
};

export default function WorkoutOfDayList({ workouts }: Props) {
  if (workouts.length === 0) {
    return (
      <div className="flex items-center justify-center text-xs h-12">
        You didn't do any exercise on this day
      </div>
    );
  }
  const propertiesIndices = {
    [ExerciseSetType.Dropset]: ExerciseDomain.detectDropSets(workouts),
    [ExerciseSetType.Superset]: ExerciseDomain.detectSuperSets(workouts),
    [ExerciseSetType.Warmup]: ExerciseDomain.detectWarmupSets(workouts),
    [ExerciseSetType.SetEnd]: ExerciseDomain.detectWorkoutEnd(workouts),
  };

  const lastSet = workouts[workouts.length - 1];
  const shouldShowTimer =
    Math.abs(differenceInMinutes(Date.now(), lastSet.date)) <= 5;
  return (
    <>
      {workouts.map((set, index) => (
        <SetEntry
          workouts={workouts}
          index={index}
          key={set.id}
          propertiesIndices={propertiesIndices}
        />
      ))}
      {shouldShowTimer && (
        <div className="flex items-center justify-center text-xs opacity-75">
          Resting time:
          <TimerText className="font-bold ml-2" time={lastSet.date} />
        </div>
      )}
    </>
  );
}
