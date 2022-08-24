import React, { useState } from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import WorkoutChartBase from '../WorkoutChartBase';
import WorkoutStatisticsTrendLine from '../WorkoutStatisticsTrendLine';
import ExerciseUtils from '../../utils/Exercise';
import SelectInput from '../Input/SelectInput';

export enum WorkoutTrendMode {
    TotalVolume = 'Total volume',
    AverageVolume = 'Average volume',
    MaxWeight = 'Max weight',
    AverageWeight = 'Average weight',
    AverageRepetition = 'Average repetitions',
}

const WorkoutTrendModePredicateMap: Record<WorkoutTrendMode, ((sets: ExerciseSetRecord[]) => number)> = {
    [WorkoutTrendMode.TotalVolume]: ExerciseUtils.totalVolume,
    [WorkoutTrendMode.AverageVolume]: ExerciseUtils.averageVolume,
    [WorkoutTrendMode.MaxWeight]: ExerciseUtils.maxWeight,
    [WorkoutTrendMode.AverageWeight]: ExerciseUtils.averageWeight,
    [WorkoutTrendMode.AverageRepetition]: ExerciseUtils.averageRepetitions,
}

type Props = {
    workoutsByDate: Record<string, ExerciseSetRecord[]>;
};

export default function WorkoutTrendLineChart({ workoutsByDate }: Props) {
    const [mode, selectMode] = useState<WorkoutTrendMode>(WorkoutTrendMode.AverageVolume);
    return (
        <WorkoutChartBase label="Workout trend" workoutsByDate={workoutsByDate}>
            <SelectInput
                label=""
                value={mode}
                className="pb-4"
                inputClassName="bg-gray-400 text-gray-700 text-sm"
                onSelect={mode => selectMode(mode as WorkoutTrendMode)}
                options={Object.values(WorkoutTrendMode).map(mode => ({ label: mode, value: mode }))} />
            <WorkoutStatisticsTrendLine
                extractDataPredicate={WorkoutTrendModePredicateMap[mode]}
                label={mode}
            />
        </WorkoutChartBase>
    );
}