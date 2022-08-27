import {
  addDays,
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  format,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useContext } from "react";
import { Scatter } from "react-chartjs-2";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import BaseChartSection, { baseChartSectionContext } from "../BaseChartSection";

const minutesSinceDayStart = (hour: number) => hour * 60;

function MealDistributionTrendInner() {
  const { date, duration } = useContext(baseChartSectionContext);
  const allRecords = useLiveQuery(
    () => ConsumptionDatabase.recordsInRange(date, duration),
    [date, duration]
  );

  const mealDistributionData = {
    datasets: [
      {
        label: "Meal distribution",
        data:
          allRecords?.map((record) => ({
            x: differenceInDays(record.date, startOfMonth(record.date)),
            y: differenceInMinutes(record.date, startOfDay(record.date)),
          })) ?? [],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    animation: { duration: 0 },
    scales: {
      y: {
        label: "time",
        grid: {
          color: "rgba(0,0,0,0)",
        },
        min: minutesSinceDayStart(6),
        max: minutesSinceDayStart(24),
        ticks: {
          callback: (label: string | number) => {
            const minutesSinceDayStart =
              typeof label === "number" ? label : parseFloat(label);
            const clockTime = addMinutes(
              startOfDay(Date.now()),
              minutesSinceDayStart
            );
            return format(clockTime, "HH:mm");
          },
        },
      },
      x: {
        label: "date",
        grid: {
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          callback: (label: string | number) => {
            const actualDay = addDays(
              startOfMonth(Date.now()),
              typeof label === "number" ? label : parseFloat(label)
            );
            return format(actualDay, "MM/dd");
          },
        },
      },
    },
  };
  return <Scatter options={options} data={mealDistributionData} />;
}

export default function MealDistributionTrend() {
  return (
    <BaseChartSection label="Meal time distribution">
      <MealDistributionTrendInner />
    </BaseChartSection>
  );
}
