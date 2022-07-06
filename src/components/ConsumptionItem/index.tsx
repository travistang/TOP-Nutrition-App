import React from 'react';
import { Consumption } from '../../types/Consumption';
import { MarcoNutrition, MarcoNutritionColor } from '../../types/Nutrition';
import ProgressBar from '../ProgressBar';
import NutritonUtils from '../../utils/Nutrition';

type Props = {
  consumption: Consumption,
  onClick?: () => void;
  maxAmount?: number;
}
export default function ConsumptionItem({ consumption, onClick, maxAmount }:Props) {
  const progressBarData =
    Object.values(MarcoNutrition).map(marco => ({
      value: NutritonUtils.marcoNutritionByAmount(marco, consumption.nutritionPerHundred, consumption.amount),
      name: marco,
      color: MarcoNutritionColor[marco]
    }))

  return (
    <div className="grid grid-cols-6 items-center w-full h-12 py-2" onClick={onClick}>
      <span className="font-bold text-sm text-gray-700 col-span-3 capitalize">{consumption.name}</span>
      <span className="font-bold text-sm text-right col-span-3">{NutritonUtils.caloriesByAmount(consumption.nutritionPerHundred, consumption.amount).toFixed(1)} kcal</span>
      <ProgressBar totalValue={maxAmount} className="col-span-4 h-1 col-start-1" data={progressBarData} />
    </div>
  )
}