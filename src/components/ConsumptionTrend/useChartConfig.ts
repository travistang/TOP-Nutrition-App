import { format, max, min } from "date-fns";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import DateUtils from "../../utils/Date";
import MeasurementUtils from "../../utils/Measurement";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { Measurement } from "../../types/Measurement";
import { getMeasurementsRange } from "./utils";
import useTargetCaloriesChartData from "./useTargetCaloriesChartData";

const getOptions = (measurementAxisRange: {
    min: number;
    max: number;
} | null) => ({
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    animation: { duration: 0 },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0)",
        },
        stacked: true,
      },
      calories: {
        type: "linear" as const,
        position: "left" as const,
        grid: {
          color: "rgba(0,0,0,0)",
        },
        stacked: true,
      },
      measurements: {
        type: "linear" as const,
        position: "right" as const,
        ...measurementAxisRange,
        grid: {
          color: "rgba(0,0,0,0)",
        },
      },
    },
  });
type Props = {
  eachDaysInDuration: Date[];
  records: ConsumptionRecord[];
  measurements: Measurement[];
};

export default function useChartConfig({
  records,
  eachDaysInDuration,
  measurements,
}: Props) {
  const targetCaloriesChartData = useTargetCaloriesChartData(
    min(eachDaysInDuration),
    max(eachDaysInDuration)
  );
  console.log({ targetCaloriesChartData });
  const measurementsGroupedByDay = DateUtils.groupRecordsByDates(
    measurements,
    eachDaysInDuration
  );
  const measurementsByDay = DateUtils.orderedRecordGroups(
    measurementsGroupedByDay
  );
  const averageMeasurementsByDay = measurementsByDay
    .map(MeasurementUtils.average)
    .map((avg) => avg?.value ?? null);

  const measurementAxisRange = getMeasurementsRange(averageMeasurementsByDay);
  const recordsGroupedByDay = DateUtils.groupRecordsByDates(
    records,
    eachDaysInDuration
  );
  const recordsByDay = DateUtils.orderedRecordGroups(recordsGroupedByDay);

  const caloriesByNutritionByDay = recordsByDay.map((dailyRecords) =>
    NutritionUtils.caloriesByNutrition(
      NutritionUtils.total(
        ...dailyRecords.map((record) =>
          NutritionUtils.nutritionFromConsumption(record)
        )
      )
    )
  );

  const consumptionTrendData = {
    labels: eachDaysInDuration.map((day) => format(day, "dd/MM")),
    datasets: [
      ...Object.values(MarcoNutrition).map((marco) => ({
        label: marco,
        type: "bar" as const,
        yAxisID: "calories",
        data: caloriesByNutritionByDay.map(
          (caloriesByNutrition) => caloriesByNutrition[marco]
        ),
        backgroundColor: MarcoNutritionColor[marco],
      })),
      targetCaloriesChartData,
      {
        label: "Measurements",
        type: "line" as const,
        yAxisID: "measurements",
        data: averageMeasurementsByDay,
        backgroundColor: "rgb(100, 0, 100)",
        borderColor: "rgb(100, 0, 100)",
      },
    ],
  };


  return {
    data: consumptionTrendData,
    options: getOptions(measurementAxisRange)
  };
}
