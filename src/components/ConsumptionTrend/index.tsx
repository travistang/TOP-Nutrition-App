import React from "react";
import { format } from "date-fns";
import { Chart } from "react-chartjs-2";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import Section from "../Section";
import { useRecoilValue } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";

type Props = {
  previousRecords: (readonly [number, ConsumptionRecord[]])[];
};
export default function ConsumptionTrend({ previousRecords }: Props) {
  const { targetCalories } = useRecoilValue(dailyNutritionGoalAtom);
  const recordsByDay = previousRecords?.map(([, records]) => records);
  const consumptionTrendData = {
    labels: previousRecords?.map(([date]) => format(date, "MM/dd")),
    datasets: [
      ...Object.values(MarcoNutrition).map((marco) => ({
        label: marco,
        type: "bar" as const,
        data: recordsByDay?.map(
          (dailyRecords) =>
            NutritionUtils.total(
              ...dailyRecords.map((record) =>
                NutritionUtils.nutritionFromConsumption(record)
              )
            )[marco]
        ),
        backgroundColor: MarcoNutritionColor[marco],
      })),
      {
        label: "target calories",
        type: "line" as const,
        data: Array(recordsByDay.length).fill(targetCalories),
        backgroundColor: "rgb(100, 0, 0)",
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0)",
        },
        stacked: true,
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0)",
        },
        stacked: true,
      },
    },
  };
  return (
    <Section label="Calories consumption trend">
      <Chart type="bar" data={consumptionTrendData} options={options} />
    </Section>
  );
}
