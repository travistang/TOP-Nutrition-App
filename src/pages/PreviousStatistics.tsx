import React from "react";
import CaloriesSurplusTrend from "../components/CarloriesSurplusTrend";

import ConsumptionTrend from "../components/ConsumptionTrend";
import MealDistributionTrend from "../components/MealDistributionTrend";
import PreviousConsumptions from "../components/PreviousConsumptions";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";

export default function PreviousStatistics() {
  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-12">
      <StatisticsNavigateTab />
      <ConsumptionTrend />
      <CaloriesSurplusTrend />
      <MealDistributionTrend />
      <PreviousConsumptions />
    </div>
  );
}
