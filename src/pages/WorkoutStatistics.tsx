import React from "react";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import WorkoutDayTypeWidget from "../components/WorkoutDayTypeWidget";

export default function WorkoutStatistics() {
  return (
    <div className="flex flex-col items-stretch gap-2 overflow-y-auto pb-24">
      <StatisticsNavigateTab />
      <WorkoutDayTypeWidget />
    </div>
  );
}
