import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import Section from '../Section';
import ExerciseUtils from '../../utils/Exercise';
import ArrayUtils from '../../utils/Array';
import DurationWidget from './DurationWidget';

type Props = {
  workouts: ExerciseSetRecord[];
}
export default function WorkoutSummary({ workouts }:Props) {
  const defaultWorkoutDayTypeString = `${ExerciseUtils.computeExerciseDayType(workouts)} day`;

  return (
    <div className="grid grid-cols-4 gap-2">
      <Section className='col-span-2' label="Workout day type">
        <span className="capitalize font-bold">{workouts.length === 0 ? 'N/A' : defaultWorkoutDayTypeString}</span>
      </Section>
      <DurationWidget workouts={workouts} />
      <Section className='col-span-2' label="Number of sets">
        <span className="capitalize font-bold">{workouts.length}</span>
      </Section>
      <Section className='col-span-2' label="Number of exercises">
        <span className="capitalize font-bold">{ArrayUtils.distinct(workouts.map(w => w.exercise), ExerciseUtils.isSameExercise).length}</span>
      </Section>
    </div>
  )
}