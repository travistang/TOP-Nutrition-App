import React from "react";
import {
  CardioExerciseRecord,
  ExerciseSetRecord,
} from "../../database/ExerciseDatabase";
import SetEntry from "./SetEntry";
import { ExerciseSetType } from "../../types/Exercise";
import ExerciseDomain from "../../domain/Exercise";
import CardioEntry from "./CardioEntry";
import ExerciseSectionTitle from "./ExerciseSectionTitle";

type Props = {
  workouts: {
    strength: ExerciseSetRecord[];
    cardio: CardioExerciseRecord[];
  };
};

export default function WorkoutOfDayList({ workouts }: Props) {
  const { strength: strengthExercises = [], cardio = [] } = workouts;

  if (strengthExercises.length + cardio.length === 0) {
    return (
      <div className="flex items-center justify-center text-xs flex-1 h-full">
        You didn't do any exercise on this day
      </div>
    );
  }
  const propertiesIndices = {
    [ExerciseSetType.Dropset]: ExerciseDomain.detectDropSets(strengthExercises),
    [ExerciseSetType.Superset]:
      ExerciseDomain.detectSuperSets(strengthExercises),
    [ExerciseSetType.Warmup]:
      ExerciseDomain.detectWarmupSets(strengthExercises),
    [ExerciseSetType.SetEnd]:
      ExerciseDomain.detectWorkoutEnd(strengthExercises),
  };

  return (
    <>
      {cardio.length > 0 && (
        <>
          <ExerciseSectionTitle text="Cardio exercises" />
          {cardio.map((cardioExercise) => (
            <CardioEntry key={cardioExercise.id} cardio={cardioExercise} />
          ))}
          <ExerciseSectionTitle text="Strength exercises" />
        </>
      )}
      <span className="text-xs text-opacity-75 text-center py-2">Newest</span>
      <div className="flex flex-col-reverse w-full items-stretch">
        {strengthExercises.map((set, index) => (
          <SetEntry
            workouts={strengthExercises}
            index={index}
            key={set.id}
            propertiesIndices={propertiesIndices}
          />
        ))}
      </div>
      <span className="text-xs text-opacity-75 text-center py-2">Oldest</span>
    </>
  );
}
