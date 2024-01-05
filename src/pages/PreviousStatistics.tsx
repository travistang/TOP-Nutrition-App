import CaloriesSurplusTrend from "../components/CarloriesSurplusTrend";

import ConsumptionTrend from "../components/ConsumptionTrend";
import MealDistributionTrend from "../components/MealDistributionTrend";
import PreviousConsumptions from "../components/PreviousConsumptions";

export default function PreviousStatistics() {
  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-12">
      <ConsumptionTrend />
      <CaloriesSurplusTrend />
      <MealDistributionTrend />
      <PreviousConsumptions />
    </div>
  );
}
