import React from 'react';
import { MarcoNutrition, MarcoNutritionCalories, MarcoNutritionColor } from '../types/Nutrition';
import ProgressBar from './ProgressBar';
import NutritionUtils from '../utils/Nutrition';
import { Food } from '../types/Food';

type Props<T extends Food> = {
  consumption: T;
  targetCalories?: number | null;
  className?: string;
}
export default function ConsumptionProgressBar<T extends Food>({ targetCalories, consumption, className }: Props<T>) {
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
    <ProgressBar
      data={progressBarData}
      className={className}
      totalValue={targetCalories ?? undefined}
    />
  );
}