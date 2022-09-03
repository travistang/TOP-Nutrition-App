import React from "react";
import { useRecoilState } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import {
  CaloriesColor,
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
  NutritionCalories,
} from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import ScalarWidget from "../Widgets/ScalarWidget";
import CalorieWidget from "./CalorieWidget";

import GaugeWidgetSection from "./GaugeWidgetSection";

import RollingDeficitWidget from "./RollingDeficitWidget";

type Props = {
  embedded?: boolean;
  nutritionRecords: Nutrition[];
};

const getMarcoWidgetConfig = (
  totalNutrition: Nutrition,
  targetCalories: number,
  targetNutritionIntake: NutritionCalories
): {
  label: string;
  color: string;
  value: number;
  total: number;
  unit: string;
  className: string;
}[] => [
  {
    label: "Calories",
    color: CaloriesColor,
    value: totalNutrition.calories,
    total: targetCalories,
    unit: "kcal",
    className: "row-span-1 col-span-4",
  },
  {
    label: "Protein",
    unit: "g",
    className: "col-span-4 col-start-3",
    color: MarcoNutritionColor[MarcoNutrition.protein],
    value: totalNutrition[MarcoNutrition.protein],
    total: targetNutritionIntake[MarcoNutrition.protein],
  },
  {
    label: "Carbohydrates",
    unit: "g",
    className: "col-span-3",
    color: MarcoNutritionColor[MarcoNutrition.carbohydrates],
    value: totalNutrition[MarcoNutrition.carbohydrates],
    total: targetNutritionIntake[MarcoNutrition.carbohydrates],
  },
  {
    label: "Fat",
    unit: "g",
    className: "col-span-3",
    color: MarcoNutritionColor[MarcoNutrition.fat],
    value: totalNutrition[MarcoNutrition.fat],
    total: targetNutritionIntake[MarcoNutrition.fat],
  },
];
export default function SummaryWidgets({ embedded, nutritionRecords }: Props) {
  const [{ targetCalories, targetNutritionIntake }, setDailyNutritionGoalAtom] =
    useRecoilState(dailyNutritionGoalAtom);
  const totalNutrition = NutritionUtils.total(...nutritionRecords);
  const caloriesByNutrition =
    NutritionUtils.caloriesByNutrition(totalNutrition);
  const marcoWidgetConfigs = getMarcoWidgetConfig(
    totalNutrition,
    targetCalories,
    targetNutritionIntake
  );
  return (
    <div className="grid grid-cols-6 grid-rows-[repeat(3,minmax(24px, 1fr))] gap-2">
      <ScalarWidget
        value={Math.round(targetCalories - totalNutrition.calories)}
        label="Daily deficit"
        className="col-span-3 row-span-1"
        unit="kcal"
      />
      <RollingDeficitWidget />
      <CalorieWidget
        caloriesByNutrition={caloriesByNutrition}
        remainingCalories={Math.max(
          0,
          targetCalories - totalNutrition.calories
        )}
      />
      {marcoWidgetConfigs.map((config) => (
        <GaugeWidgetSection
          key={config.label}
          label={config.label}
          color={config.color}
          value={config.value}
          maxValue={config.total}
          unit={config.unit}
          className={config.className}
        />
      ))}
    </div>
  );
}
