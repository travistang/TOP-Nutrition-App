import React from 'react';
import { differenceInMinutes } from 'date-fns';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import ExerciseDomain from '../../domain/Exercise';
import { ExerciseSetType } from '../../types/Exercise';
import SetItem from './SetItem';
import TimerText from '../TimerText';

type Props = {
    workouts: ExerciseSetRecord[];
};
type ExercisePropertiesIndices = Record<ExerciseSetType, number[]>;

const computeSetProperties = (index: number, indiciesList: ExercisePropertiesIndices): ExerciseSetType[] => {
    const propertyIndiciesPair = Object.entries(indiciesList) as [ExerciseSetType, number[]][];
    return propertyIndiciesPair.reduce((properties, [property, indices]) => {
        if (indices.includes(index)) {
            return [...properties, property]
        };
        return properties;
    }, [] as ExerciseSetType[]);
}

export default function WorkoutOfDayList({ workouts }: Props) {
    const propertiesIndices = {
        [ExerciseSetType.Dropset]: ExerciseDomain.detectDropSets(workouts),
        [ExerciseSetType.Superset]: ExerciseDomain.detectSuperSets(workouts),
        [ExerciseSetType.Warmup]: ExerciseDomain.detectWarmupSets(workouts),
        [ExerciseSetType.SetEnd]: ExerciseDomain.detectWorkoutEnd(workouts),
    }

    if (workouts.length === 0) {
        return (
            <div className="flex items-center justify-center text-xs h-12">
                You didn't do any exercise on this day
            </div>
        );
    }
    const lastSet = workouts[workouts.length - 1];
    const shouldShowTimer = (differenceInMinutes(Date.now(), lastSet.date) <= 5);
    return (
        <>
            {workouts.map((set, index) => (
                <SetItem
                    set={set}
                    key={set.id}
                    index={index}
                    properties={computeSetProperties(index, propertiesIndices)}
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