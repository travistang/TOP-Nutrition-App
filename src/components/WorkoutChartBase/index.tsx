import React, { useState } from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import AutoCompleteInput from '../Input/AutoCompleteInput';
import Section from '../Section';
import ArrayUtils from '../../utils/Array';
import ExerciseUtils from '../../utils/Exercise';
import ObjectUtils from '../../utils/Object';
import StringUtils from '../../utils/String';
import { Exercise } from '../../types/Exercise';
import WorkoutByDateContextProvider from './WorkoutByDateContext';
import ExerciseAutocompleteResult from '../Input/ExerciseAutocompleteResult';

type Props = {
    label: string;
    children: React.ReactNode;
    workoutsByDate: Record<string, ExerciseSetRecord[]>;
};
export default function WorkoutChartBase({ label, children, workoutsByDate }: Props) {
    const exerciseOfMonth = Object.values(workoutsByDate)
        .flatMap(workoutsOfDay => workoutsOfDay.map(workout => workout.exercise));
    const exerciseList = ArrayUtils.distinct(exerciseOfMonth, ExerciseUtils.isSameExercise);
    const [exerciseSearchText, setExerciseSearchText] = useState('');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const onChooseSelectedExercise = (exercise: Exercise) => {
        setExerciseSearchText(exercise.name);
        setSelectedExercise(exercise);
    };

    const getExerciseSearchResult = async (searchString: string) => {
        return exerciseList.filter(exercise =>
            StringUtils.searchCaseInsensitive(exercise.name, searchString)
        );
    };

    const workoutsWithExerciseByDate = selectedExercise ? ObjectUtils.mapValues(
        workoutsByDate,
        (workouts) => ExerciseUtils.filterWorkoutsWithExercise(workouts, selectedExercise))
        : {};

    return (
        <Section label={label}>
            <AutoCompleteInput
                label=""
                icon="search"
                placeholder="Search exercises..."
                inputClassName="bg-gray-300"
                innerInputClassName="text-gray-700 text-sm placeholder:text-sm"
                value={exerciseSearchText}
                onChange={setExerciseSearchText}
                onSelectSearchResult={onChooseSelectedExercise}
                onSearch={getExerciseSearchResult}
                renderResult={(exercise: Exercise) => <ExerciseAutocompleteResult exercise={exercise} />}
            />
            <WorkoutByDateContextProvider workoutByDates={workoutsWithExerciseByDate}>
                {children}
            </WorkoutByDateContextProvider>
        </Section>
    );
}