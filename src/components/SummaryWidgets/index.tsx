import React from "react";
import { useRecoilState } from "recoil";
import { isSameDay } from "date-fns";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import { useMaintenanceCalories } from "../../domain/MaintenanceCalories";
import { DEFAULT_TARGET_CALORIES, useTargetCalories } from "../../domain/TargetCalories";
import {
  CaloriesColor,
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
  NutritionCalories,
} from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import CalorieWidget from "./CalorieWidget";

import GaugeWidgetSection from "./GaugeWidgetSection";

import RollingDeficitWidget from "./RollingDeficitWidget";
import TodayDeficitWidget from "./TodayDeficitWidget";
import ObjectUtils from '../../utils/Object';

type Props = {
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
const now = Date.now();
export default function SummaryWidgets({ nutritionRecords }: Props) {
  const targetCaloriesByDay = useTargetCalories(now, now);
  const maintenanceCalories = useMaintenanceCalories();
  const [{ targetNutritionIntake }] = useRecoilState(
    dailyNutritionGoalAtom
    );

  const totalNutrition = NutritionUtils.total(...nutritionRecords);
  const caloriesByNutrition =
    NutritionUtils.caloriesByNutrition(totalNutrition);
  const targetCalories = ObjectUtils.findByKey(targetCaloriesByDay, day => isSameDay(new Date(day), now)) ?? DEFAULT_TARGET_CALORIES;
  const marcoWidgetConfigs = getMarcoWidgetConfig(
    totalNutrition,
    targetCalories,
    targetNutritionIntake
  );
  return (
    <div className="grid grid-cols-6 grid-rows-[repeat(3,minmax(24px, 1fr))] gap-2">
      <TodayDeficitWidget
        maintenanceCalories={maintenanceCalories}
        caloriesConsumed={totalNutrition.calories}
      />
      <RollingDeficitWidget maintenanceCalories={maintenanceCalories} />
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
