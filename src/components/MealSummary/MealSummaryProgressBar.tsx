import React, { useContext } from "react";
import {
  MarcoNutrition,
  MarcoNutritionCalories,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import ProgressBar from "../ProgressBar";
import { targetCaloriesContext } from "./TargetCaloriesContext";

type Props = {
  mealNutrition: Nutrition;
};
export default function MealSummaryProgressBar({ mealNutrition }: Props) {
  const targetCaloriesOfDay = useContext(targetCaloriesContext);
  const progressBarData = Object.values(MarcoNutrition).map((marco) => ({
    value: mealNutrition[marco] * MarcoNutritionCalories[marco],
    name: marco,
    color: MarcoNutritionColor[marco],
  }));

  return (
    <ProgressBar
      className="col-span-12 h-1 col-start-1"
      data={progressBarData}
      totalValue={targetCaloriesOfDay ?? undefined}
    />
  );
}
