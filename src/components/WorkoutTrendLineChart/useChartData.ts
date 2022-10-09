import { WorkoutTrendMode } from "./types";
import ExerciseUtils from "../../utils/Exercise";
import DateUtils from "../../utils/Date";
import ObjectUtils from "../../utils/Object";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";
import { format } from "date-fns";
import { WorkoutTrendLineConfig } from "./WorkoutTrendLineConfigGroup";

const chartOptions = {
  plugins: { tooltip: { enabled: false }, legend: { display: false } },
};

const WorkoutTrendModePredicateMap: Record<
  WorkoutTrendMode,
  (sets: ExerciseSetRecord[]) => number
> = {
  [WorkoutTrendMode.TotalVolume]: ExerciseUtils.totalVolume,
  [WorkoutTrendMode.AverageVolume]: ExerciseUtils.averageVolume,
  [WorkoutTrendMode.MaxWeight]: ExerciseUtils.maxWeight,
  [WorkoutTrendMode.AverageWeight]: ExerciseUtils.averageWeight,
  [WorkoutTrendMode.AverageRepetition]: ExerciseUtils.averageRepetitions,
};

type Props = {
  config: WorkoutTrendLineConfig;
  workoutsByDates: Record<string, ExerciseSetRecord[]>;
};
export default function useChartData({ config, workoutsByDates }: Props) {
  const { trendMode, selectedExercise, selectMonth, duration } = config;
  const extractDataPredicate = WorkoutTrendModePredicateMap[trendMode];

  const workoutsWithExerciseByDate = selectedExercise
    ? ObjectUtils.mapValues(workoutsByDates, (workouts) =>
        ExerciseUtils.filterWorkoutsWithExercise(workouts, selectedExercise)
      )
    : {};

  const dataByDate = ObjectUtils.mapValues(
    workoutsWithExerciseByDate,
    extractDataPredicate
  );

  const dataByDateWithoutZero = ObjectUtils.filterValues(
    dataByDate,
    (value) => value > 0
  );

  const allDaysInInterval = DateUtils.eachDaysOfIntervalFromDuration(
    selectMonth,
    duration
  );
  const data = {
    labels: allDaysInInterval.map((date) => format(date, "dd/MM")),
    datasets: [
      {
        label: "Trend",
        data: allDaysInInterval.map((date) => {
          const dateKey = format(date, "yyyy/MM/dd");
          return dataByDateWithoutZero[dateKey];
        }),
        borderColor: "rgb(198, 95, 84)",
        backgroundColor: "rgb(198, 95, 84)",
      },
    ],
  };
  return { data, chartOptions };
}
