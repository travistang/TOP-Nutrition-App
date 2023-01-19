import React from 'react';
import { Line } from 'react-chartjs-2';
import { ExerciseSetRecord } from '../../../database/ExerciseDatabase';
import { WorkoutTrendMode } from '../../../types/Exercise';
import Section from '../../Section';
import ExerciseUtils from '../../../utils/Exercise';
import ObjectUtils from '../../../utils/Object';
import { format } from 'date-fns';

type Props = {
  trendMode: WorkoutTrendMode;
  workouts: ExerciseSetRecord[];
};

export default function RecentExerciseStatisticsChart({ trendMode, workouts }: Props) {
  const workoutsByDate = ExerciseUtils.groupWorkoutsByDate(workouts);
  const sortedWorkouts = ObjectUtils.valueBySortedKey(
    workoutsByDate,
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const chartData = {
    labels: sortedWorkouts.map(workoutGroupByDay => format(workoutGroupByDay[0].date, 'dd/MM')),
    datasets: [{
      label: trendMode,
      data: sortedWorkouts.map(workoutGroup => ExerciseUtils.computeWorkoutsStatistics(workoutGroup, trendMode)),
      borderColor: "rgb(198, 95, 84)",
      backgroundColor: "rgb(198, 95, 84)",
    }]
  };
  return (
    <Section className="flex flex-col" label={`${trendMode} trend`}>
      <Line height={72} data={chartData} className="h-16"
        options={{
          responsive: true,
        plugins: { tooltip: { enabled: false }, legend: { display: false } }
      }} />
    </Section>
  );
}