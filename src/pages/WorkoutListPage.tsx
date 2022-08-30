import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../database/ExerciseDatabase";
import WorkoutOfDayList from "../components/WorkoutOfDayList";
import WorkoutSummary from "../components/WorkoutSummary";

export default function WorkoutListPage() {
  const exercisesOfDay = useLiveQuery(() => {
    return ExerciseDatabase.exercisesOfDay(Date.now());
  }) ?? [];

  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <div className="p-2 gap-2 pb-12">
        <WorkoutSummary workouts={exercisesOfDay} />
        <WorkoutOfDayList workouts={exercisesOfDay} />
      </div>
    </div>
  );
}
