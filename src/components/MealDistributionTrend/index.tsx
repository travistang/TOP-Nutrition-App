import {
  addDays,
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  format,
  startOfDay,
  startOfMonth,
} from "date-fns";
import React from "react";
import { Scatter } from "react-chartjs-2";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import Section from "../Section";

type Props = {
  previousRecords: (readonly [number, ConsumptionRecord[]])[];
};
export default function MealDistributionTrend({ previousRecords }: Props) {
  const allRecords = previousRecords?.map(([, records]) => records).flat();
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
        beginAtZero: true,
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
  return (
    <Section label="Meal time distribution">
      <Scatter options={options} data={mealDistributionData} />
    </Section>
  );
}
