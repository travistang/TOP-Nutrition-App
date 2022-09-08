import React from "react";
import {
  MarcoNutrition,
  MarcoNutritionCalories,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import ProgressBar from "../ProgressBar";

type Props = {
  mealNutrition: Nutrition;
};
export default function MealSummaryProgressBar({ mealNutrition }: Props) {

  const progressBarData = Object.values(MarcoNutrition).map((marco) => ({
    value: mealNutrition[marco] * MarcoNutritionCalories[marco],
    name: marco,
    color: MarcoNutritionColor[marco],
  }));

  // TODO: Findout target calories of day
  return (
    <ProgressBar
      className="col-span-12 h-1 col-start-1"
      data={progressBarData}
    />
  );
}
