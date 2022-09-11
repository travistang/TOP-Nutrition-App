import React, { useContext } from "react";
import { Consumption } from "../../types/Consumption";
import {
  MarcoNutrition,
  MarcoNutritionCalories,
  MarcoNutritionColor,
} from "../../types/Nutrition";
import ProgressBar from "../ProgressBar";
import NutritionUtils from "../../utils/Nutrition";
import { targetCaloriesContext } from "../MealSummary/TargetCaloriesContext";

type Props = {
  mealCalories: number;
  consumption: Consumption;
  onClick?: () => void;
};
export default function ConsumptionItem({
  mealCalories,
  consumption,
  onClick,
}: Props) {
  const targetCalories = useContext(targetCaloriesContext);
  const itemCalories = NutritionUtils.caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );
  const calorieRatioAgainstMeal = itemCalories / mealCalories;
  const progressBarData = Object.values(MarcoNutrition).map((marco) => ({
    value:
      NutritionUtils.marcoNutritionByAmount(
        marco,
        consumption.nutritionPerHundred,
        consumption.amount
      ) * MarcoNutritionCalories[marco],
    name: marco,
    color: MarcoNutritionColor[marco],
  }));

  return (
    <div
      className="flex-shrink-0 grid grid-cols-6 items-center w-full h-14 py-2"
      onClick={onClick}
    >
      <span className="font-bold text-gray-700 col-span-4 capitalize text-sm">
        {consumption.name}{" "}
        <i className="text-xs lowercase">({consumption.amount.toFixed(1)} g)</i>
      </span>
      <div className="col-span-2 flex flex-col items-end">
        <span className="font-bold text-sm text-right">
          {itemCalories.toFixed(1)} kcal
        </span>
        <span className="text-xs text-yellow-700">
          {(calorieRatioAgainstMeal * 100).toFixed(1)}% of meal
        </span>
      </div>
      <ProgressBar
        totalValue={targetCalories ?? undefined}
        className="col-span-4 h-1 col-start-1"
        data={progressBarData}
      />
    </div>
  );
}
