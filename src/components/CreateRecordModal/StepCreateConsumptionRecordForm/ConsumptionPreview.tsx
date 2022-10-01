import React from 'react';
import toast from 'react-hot-toast';
import ConsumptionDatabase, { ConsumptionRecord } from '../../../database/ConsumptionDatabase';
import { Optional } from '../../../types/utils';
import NutritionUtils from '../../../utils/Nutrition';
import Button, { ButtonStyle } from '../../Input/Button';
import ScalarWidget from '../../Widgets/ScalarWidget';
import EstimatedCaloriesConsumption from '../EstimatedCaloriesConsumption';

type Props = {
  record: Optional<ConsumptionRecord, "id">
  onClose: () => void;
}
export default function ConsumptionPreview({ record, onClose }: Props) {

  const { id, name, nutritionPerHundred, amount } = record;
  if (!name) return null;

  const canDelete = !!id;
  const caloriesPerHundred = nutritionPerHundred.calories;
  const totalCalories = NutritionUtils.caloriesByAmount(
    nutritionPerHundred,
    amount
  );
  const onDelete = async () => {
    try {
      await ConsumptionDatabase.remove(id!);
      toast.success("Record deleted");
      onClose();
    } catch {
      toast.error("Failed to delete record");
    }
  }
  return (
    <div className="grid grid-cols-6 gap-2 py-2">
      <span className="text-xs col-span-4">Summary</span>
      {canDelete && (
        <Button
          className="col-span-2 justify-right bg-red-400 bg-opacity-50"
          textClassName='text-red-500 child:fill-red-500'
          buttonStyle={ButtonStyle.Clear}
          text="Delete"
          icon="trash"
          onClick={onDelete}
        />
      )}
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