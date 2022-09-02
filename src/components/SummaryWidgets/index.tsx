import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import {
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import Section from "../Section";
import ScalarWidget from "../Widgets/ScalarWidget";
import CalorieWidget from "./CalorieWidget";
import GaugeWidget from "./GaugeWidget";

import ProgressBarWidget from "./ProgressBarWidget";

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
    <div className="grid grid-cols-3 grid-rows-[repeat(3,minmax(24px, 1fr))] gap-2">
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
        className="row-span-1 col-span-2"
      />
      <ScalarWidget
        value={Math.round(targetCalories - totalNutritions.calories)}
        label="Daily deficit"
        className="col-span-1 row-span-1"
        unit="kcal"
      />
      <ScalarWidget
        value={Math.round(targetCalories - totalNutritions.calories)}
        label="Weekly deficit"
        className="col-span-1 row-span-1"
        unit="kcal"
      />
      <Section label="Protein consumption" className="flex flex-nowrap justify-around col-span-full rounded-lg h-min bg-gray-300">
        <div className="flex flex-nowrap justify-around py-2 gap-2">
          <GaugeWidget
                unit="g"
                className="flex-1"
                color={MarcoNutritionColor[MarcoNutrition.protein]}
                value={totalNutritions[MarcoNutrition.protein]}
                maxValue={targetNutritionIntake[MarcoNutrition.protein]}
                label={MarcoNutrition.protein} />
        </div>
      </Section>

    </div>
  );
}
