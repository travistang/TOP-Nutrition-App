import { useRecoilValue } from "recoil";
import { format } from "date-fns";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import DateUtils from "../../utils/Date";
import MeasurementUtils from "../../utils/Measurement";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import { Measurement } from "../../types/Measurement";

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
  const { targetCalories } = useRecoilValue(dailyNutritionGoalAtom);
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
  console.log({ caloriesByNutritionByDay });

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
      {
        label: "target calories",
        yAxisID: "calories",
        type: "line" as const,
        data: Array(recordsByDay.length).fill(targetCalories),
        pointRadius: 0,
        borderColor: "rgb(100, 0, 0)",
      },
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

  const options = {
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
        grid: {
          color: "rgba(0,0,0,0)",
        },
      },
    },
  };
  return { data: consumptionTrendData, options };
}
