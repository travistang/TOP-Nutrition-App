import React from 'react';
import { differenceInMinutes } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import ExerciseDatabase from '../../database/ExerciseDatabase';
import TimerText from '../TimerText';

export default function WorkoutTimer() {
  const lastSetOfToday = useLiveQuery(() => ExerciseDatabase.exercisesOfDay())?.at(-1);
  if (!lastSetOfToday) return null;

  const isSetTooOld = Math.abs(differenceInMinutes(Date.now(), lastSetOfToday.date)) >= 10;
  if (isSetTooOld) return null;

  return (
    <div className="flex items-center justify-center text-sm bg-blue-500 text-gray-200 absolute left-0 right-0 bottom-full z-50 h-16">
      Resting time:
      <TimerText className="font-bold ml-2 text-gray-200" time={lastSetOfToday.date} />
    </div>
  )
}