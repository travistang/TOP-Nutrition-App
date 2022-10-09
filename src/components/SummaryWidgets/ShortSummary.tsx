import React from "react";
import {
  CaloriesColor,
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import Chip from "../Chip";
import NutritionUtils from "../../utils/Nutrition";

type Props = {
  nutritionRecords: Nutrition[];
};
export default function ShortSummary({ nutritionRecords }: Props) {
  const totalNutrition = NutritionUtils.total(...nutritionRecords);

  return (
    <div className="flex flex-col items-stretch gap-1">
      <span className="text-xs">Total calories consumed</span>
      <div className="text-xl font-bold" style={{ color: CaloriesColor }}>
        {totalNutrition.calories.toFixed(1)} kcal
      </div>
      <div className="flex flex-nowrap justify-between gap-2">
        {Object.values(MarcoNutrition).map((marco) => (
          <Chip
            key={marco}
            text={`${totalNutrition[marco].toFixed(0)}g`}
            color={MarcoNutritionColor[marco]}
            className="flex-1 flex justify-center text-center text-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
