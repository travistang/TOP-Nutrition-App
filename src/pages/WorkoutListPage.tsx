import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../database/ExerciseDatabase";
import WorkoutOfDayList from "../components/WorkoutOfDayList";

export default function WorkoutListPage() {
  const exercisesOfDay = useLiveQuery(() => {
    return ExerciseDatabase.exercisesOfDay(Date.now());
  },);

  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <div className="p-2 gap-2">
        <WorkoutOfDayList workouts={exercisesOfDay ?? []} />
      </div>
    </div>
  );
}
