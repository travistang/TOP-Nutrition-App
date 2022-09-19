import React from "react";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import SetEntry from "./SetEntry";
import { ExerciseSetType } from "../../types/Exercise";
import ExerciseDomain from "../../domain/Exercise";

type Props = {
  workouts: ExerciseSetRecord[];
};

export default function WorkoutOfDayList({ workouts }: Props) {
  if (workouts.length === 0) {
    return (
      <div className="flex items-center justify-center text-xs flex-1 h-full">
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

  return (
    <>
      <span className='text-xs text-opacity-75 text-center py-2'>Newest</span>
      {workouts.reverse().map((set, index) => (
        <SetEntry
          workouts={workouts}
          index={workouts.length - 1 - index}
          key={set.id}
          propertiesIndices={propertiesIndices}
        />
      ))}
      <span className='text-xs text-opacity-75 text-center py-2'>Oldest</span>
    </>
  );
}
