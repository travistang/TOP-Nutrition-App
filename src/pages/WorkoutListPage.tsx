import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseSetOverview from "../components/ExerciseSetOverview";
import ExerciseDatabase from "../database/ExerciseDatabase";
import ExerciseUtils from "../utils/Exercise";

export default function WorkoutListPage() {
  const exercisesOfDay = useLiveQuery(() => {
    return ExerciseDatabase.exercisesOfDay(Date.now());
  },);

  const workoutsByExercises = ExerciseUtils.groupWorkouts(exercisesOfDay ?? []);

  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <div className="p-2 gap-2">

        {workoutsByExercises.length === 0 && (
          <div className="flex items-center justify-center text-xs h-12">
            You didn't do any exercise on this day
          </div>
        )}
        {workoutsByExercises.map((workout) => (
          <ExerciseSetOverview key={workout[0].id} sets={workout} />
        ))}
      </div>
    </div>
  );
}
