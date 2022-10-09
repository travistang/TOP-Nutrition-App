import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import { Exercise } from '../../types/Exercise';
import ObjectUtils from '../../utils/Object';
import ExerciseUtils from '../../utils/Exercise';
import PreviousWorkoutList from '../CreateExerciseSetModal/PreviousWorkoutList';

type Props = {
  selectedExercise: Exercise | null;
  workoutsByDates: Record<string, ExerciseSetRecord[]>;
}
export default function PreviousRecordsList({ selectedExercise, workoutsByDates}: Props) {
  if (!selectedExercise) return null;
  const datesWithSelectedWorkout = ObjectUtils.filterValues(
    workoutsByDates, (workouts) => workouts.some(
      workout => ExerciseUtils.isSameExercise(workout.exercise, selectedExercise))
  );
  console.log({ datesWithSelectedWorkout });
  const workoutsSortedByDates = ObjectUtils.valueBySortedKey(
    datesWithSelectedWorkout,
    (dateStringA, dateStringB) => new Date(dateStringB).getTime() - new Date(dateStringA).getTime()
  );
  const hasNoRecords = workoutsSortedByDates.length === 0;
  return (
    <>
      {hasNoRecords ? (
        <span className="py-4 text-xs text-center">
          There are no recent records of this exercise
        </span>
      ) : (
        <div className="flex flex-col items-stretch pt-2">
          <span className="text-xs flex-shrink-0 bg-gray-300">Recent records</span>
            <div className="flex flex-col items-stretch max-h-72 overflow-y-auto">
            {workoutsSortedByDates.map((workouts) => (
              <PreviousWorkoutList
                key={workouts[0].id}
                workouts={workouts}
                dateStringClassName="bg-gray-300 -top-1"
              />
            ))}
            </div>
        </div>
      )}
    </>
  )
}