import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';

import WorkoutChartBase from '../WorkoutChartBase';
import WorkoutStatisticsTrendLine from '../WorkoutStatisticsTrendLine';

type Props = {
    workoutsByDate: Record<string, ExerciseSetRecord[]>;
    extractDataPredicate: (sets: ExerciseSetRecord[]) => number;
    label: string;
};

export default function WorkoutTrendLineChart({ workoutsByDate, label, extractDataPredicate }: Props) {
    return (
        <WorkoutChartBase label={label} workoutsByDate={workoutsByDate}>
            <WorkoutStatisticsTrendLine extractDataPredicate={extractDataPredicate} label="Volume" />
        </WorkoutChartBase>
    );
}