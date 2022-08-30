import React from 'react';
import Section from '../Section';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';

type Props = {
  workouts: ExerciseSetRecord[];
}
export default function DurationWidget({ workouts }:Props) {
  const workoutsByTime = workouts.map(w => w.date).sort();
  const totalTimeMs = workoutsByTime.reduce((timeMs, timestamp, i) => {
    const nextTime = workoutsByTime[i + 1];
    if (!nextTime) return timeMs;
    return timeMs + (nextTime - timestamp);
  }, 0);
  return (
    <Section className="col-span-2" label="Duration">
      <span className="capitalize font-bold">{Math.round(totalTimeMs / 1000 / 60)} minutes</span>
    </Section>
  )
}