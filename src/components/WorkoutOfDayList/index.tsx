import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import ExerciseUtils from "../../utils/Exercise";
import ExerciseSetOverview from '../ExerciseSetOverview';

type Props = {
    workouts: ExerciseSetRecord[];
};

export default function WorkoutOfDayList({ workouts }: Props) {
    const workoutsByExercises = ExerciseUtils.groupWorkouts(workouts ?? []);
    if (workoutsByExercises.length === 0) {
        return (
            <div className="flex items-center justify-center text-xs h-12">
                You didn't do any exercise on this day
            </div>
        );
    }
    return (
        <>
            {workoutsByExercises.map((workout) => (
                <ExerciseSetOverview key={workout[0].id} sets={workout} />
            ))}
        </>
    );
}