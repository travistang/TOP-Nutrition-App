import React from 'react';
import { ConsumptionRecord } from '../../../database/ConsumptionDatabase';
import { Optional } from '../../../types/utils';
import NutritionUtils from '../../../utils/Nutrition';
import ScalarWidget from '../../Widgets/ScalarWidget';
import EstimatedCaloriesConsumption from '../EstimatedCaloriesConsumption';

type Props = {
  record: Optional<ConsumptionRecord, "id">
}
export default function ConsumptionPreview({ record }: Props) {
  const { name, nutritionPerHundred, amount } = record;

  if (!name) return null;
  const caloriesPerHundred = nutritionPerHundred.calories;
  const totalCalories = NutritionUtils.caloriesByAmount(
    nutritionPerHundred,
    amount
  );

  return (
    <div className="grid grid-cols-6 gap-2 py-2">
      <span className="text-xs col-span-full">Summary</span>
      <span className="font-bold col-span-4">{name}</span>
      <div className='col-span-2 flex flex-col items-end'>
        <span className="text-sm font-bold text-right">{caloriesPerHundred.toFixed(1)} kcal/100g</span>
        <span className="text-sm text-opacity-70">{amount.toFixed(1)}g</span>
      </div>
      <EstimatedCaloriesConsumption record={record} />
      <ScalarWidget label="Total Calories:" value={totalCalories} className="col-span-3" unit="kcal" />
    </div>
  )
}