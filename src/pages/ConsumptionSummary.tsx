import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ConsumptionDatabase from "../database/ConsumptionDatabase";
import SummaryWidgets from "../components/SummaryWidgets";
import NutritionUtils from "../utils/Nutrition";
import MealUtils from "../utils/Meal";
import DateUtils from "../utils/Date";
import MealSummary from "../components/MealSummary";
import ShortSummary from "../components/SummaryWidgets/ShortSummary";

type Props = {
  embedded?: boolean;
  date: Date;
};
export default function ConsumptionSummary({
  embedded,
  date,
}: Props) {
  const consumptionsOfDay = useLiveQuery(() =>
    ConsumptionDatabase.consumptionsOfDay(date.getTime()),
    [date]
  );
  const consumptionsByMeals = DateUtils.groupByTimeInterval(
    consumptionsOfDay ?? [],
    30
  );
  const nutritionRecords =
    consumptionsOfDay?.map(NutritionUtils.nutritionFromConsumption) ?? [];
  const totalCaloriesIntake = MealUtils.totalNutrition(
    consumptionsOfDay ?? []
  ).calories;

  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      {embedded ? (
        <ShortSummary nutritionRecords={nutritionRecords} />
      ) : (
        <>
          <SummaryWidgets nutritionRecords={nutritionRecords} />
          <div className="flex flex-no-wrap pt-8 items-center text-xs gap-1 pb-2">
            <span>Meals today</span>
          </div>
        </>
      )}
      <div className="flex flex-col min-h-1/2  pb-16">
        {!embedded && !consumptionsOfDay?.length && (
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-sm">
            <FontAwesomeIcon icon="hamburger" className="text-3xl" />
            You haven't eatten anything yet today...
          </div>
        )}
        {consumptionsByMeals?.map((meal, index) => (
          <MealSummary
            caloriesIntakeOfDay={totalCaloriesIntake}
            meal={meal}
            index={index}
            key={meal[0].id}
          />
        ))}
      </div>
    </div>
  );
}
