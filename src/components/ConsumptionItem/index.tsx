import React from 'react';
import { Consumption } from '../../types/Consumption';
import { MarcoNutrition, MarcoNutritionCalories, MarcoNutritionColor } from '../../types/Nutrition';
import ProgressBar from '../ProgressBar';
import NutritonUtils from '../../utils/Nutrition';
import { useRecoilValue } from 'recoil';
import { dailyNutritionGoalAtom } from '../../atoms/DailyNutritionGoalAtom';

type Props = {
  consumption: Consumption,
  onClick?: () => void;
  maxAmount?: number;
}
export default function ConsumptionItem({ consumption, onClick, maxAmount }:Props) {
  const { targetCalories } = useRecoilValue(dailyNutritionGoalAtom);

  const progressBarData =
    Object.values(MarcoNutrition).map(marco => ({
      value: NutritonUtils.marcoNutritionByAmount(marco, consumption.nutritionPerHundred, consumption.amount) * MarcoNutritionCalories[marco],
      name: marco,
      color: MarcoNutritionColor[marco]
    }))

  return (
    <div className="flex-shrink-0 grid grid-cols-6 items-center w-full h-14 py-2" onClick={onClick}>
      <span className="font-bold text-gray-700 col-span-4 capitalize text-sm">
        {consumption.name} <i className="text-xs">({consumption.amount.toFixed(1)} g)</i></span>
      <span className="font-bold text-sm text-right col-span-2">{NutritonUtils.caloriesByAmount(consumption.nutritionPerHundred, consumption.amount).toFixed(1)} kcal</span>
      <ProgressBar totalValue={targetCalories} className="col-span-4 h-1 col-start-1" data={progressBarData} />
    </div>
  )
}