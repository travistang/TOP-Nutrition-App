import React from "react";
import { useRecoilValue } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
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
  const { targetCalories } = useRecoilValue(dailyNutritionGoalAtom);

  const progressBarData = Object.values(MarcoNutrition).map((marco) => ({
    value: mealNutrition[marco] * MarcoNutritionCalories[marco],
    name: marco,
    color: MarcoNutritionColor[marco],
  }));

  return (
    <ProgressBar
      totalValue={targetCalories}
      className="col-span-12 h-1 col-start-1"
      data={progressBarData}
    />
  );
}
