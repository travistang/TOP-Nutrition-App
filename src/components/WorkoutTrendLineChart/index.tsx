import React, { useState } from "react";
import { WorkoutTrendMode } from "./types";
import Section from "../Section";
import WorkoutTrendLineConfigGroup, {
  WorkoutTrendLineConfig,
} from "./WorkoutTrendLineConfigGroup";
import { Duration } from "../../types/Duration";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import DateUtils from "../../utils/Date";
import { Line } from "react-chartjs-2";
import useChartData from "./useChartData";
import PreviousRecordsList from "./PreviousRecordsList";

export default function WorkoutTrendLineChart() {
  const [config, setConfig] = useState<WorkoutTrendLineConfig>({
    searchText: "",
    selectedExercise: null,
    selectMonth: new Date(),
    duration: Duration.OneMonth,
    trendMode: WorkoutTrendMode.MaxWeight,
  });
  const { selectMonth, duration } = config;
  const daysInInterval = DateUtils.eachDaysOfIntervalFromDuration(
    selectMonth,
    duration
  );
  const workoutsByDates =
    useLiveQuery(async () => {
      const workouts = await ExerciseDatabase.recordsInRange(
        selectMonth,
        duration
      );
      return DateUtils.groupRecordsByDates(workouts, daysInInterval);
    }, [selectMonth, duration]) ?? {};
  const { chartOptions, data } = useChartData({ config, workoutsByDates });

  return (
    <Section label="Workout trend">
      <WorkoutTrendLineConfigGroup config={config} onChange={setConfig} />
      <Line options={chartOptions} data={data} />
      <PreviousRecordsList
        selectedExercise={config.selectedExercise}
        workoutsByDates={workoutsByDates}
      />
    </Section>
  );
}
