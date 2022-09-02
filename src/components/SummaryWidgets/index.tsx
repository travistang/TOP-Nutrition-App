import React from "react";
import { useRecoilState } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import {
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import ScalarWidget from "../Widgets/ScalarWidget";
import CalorieWidget from "./CalorieWidget";

import GaugeWidgetSection from "./GaugeWidgetSection";

import ProgressBarWidget from "./ProgressBarWidget";
import RollingDeficitWidget from "./RollingDeficitWidget";

type Props = {
  embedded?: boolean;
  nutritionRecords: Nutrition[];
};
export default function SummaryWidgets({ embedded, nutritionRecords }: Props) {
  const [{ targetCalories, targetNutritionIntake }, setDailyNutritionGoalAtom] =
    useRecoilState(dailyNutritionGoalAtom);
  const totalNutritions = NutritionUtils.total(...nutritionRecords);
  const caloriesByNutrition =
    NutritionUtils.caloriesByNutrition(totalNutritions);

  return (
    <div className="grid grid-cols-6 grid-rows-[repeat(3,minmax(24px, 1fr))] gap-2">
      <ScalarWidget
        value={Math.round(targetCalories - totalNutritions.calories)}
        label="Daily deficit"
        className="col-span-3 row-span-1"
        unit="kcal"
      />
      <RollingDeficitWidget />
      <CalorieWidget
        caloriesByNutrition={caloriesByNutrition}
        remainingCalories={Math.max(
          0,
          targetCalories - totalNutritions.calories
        )}
      />
      <ProgressBarWidget
        value={totalNutritions.calories}
        totalValue={targetCalories}
        color="rgb(100, 0, 0)"
        label="Calories today"
        unit="kcal"
        className="row-span-1 col-span-4"
      />

      <GaugeWidgetSection
        label="Protein"
        className="col-span-4 col-start-3"
        color={MarcoNutritionColor[MarcoNutrition.protein]}
        value={totalNutritions[MarcoNutrition.protein]}
        maxValue={targetNutritionIntake[MarcoNutrition.protein]}
      />
      <GaugeWidgetSection
        label="Carbohydrates"
        className="col-span-3"
        color={MarcoNutritionColor[MarcoNutrition.carbohydrates]}
        value={totalNutritions[MarcoNutrition.carbohydrates]}
        maxValue={targetNutritionIntake[MarcoNutrition.carbohydrates]}
      />
      <GaugeWidgetSection
        label="Fat"
        className="col-span-3"
        color={MarcoNutritionColor[MarcoNutrition.fat]}
        value={totalNutritions[MarcoNutrition.fat]}
        maxValue={targetNutritionIntake[MarcoNutrition.fat]}
      />

    </div>
  );
}
