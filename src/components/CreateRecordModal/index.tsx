import React, { useCallback, useState } from 'react';
import { Consumption, DEFAULT_CONSUMPTION } from '../../types/Consumption';
import TextInput from '../Input/TextInput';
import Modal from '../Modal';
import NutritionFacts from '../NutritionFacts';
import NutritionUtils from '../../utils/Nutrition';
import DateUtils from '../../utils/Date';
import Button from '../Input/Button';

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CreateRecordModal({ opened, onClose }: Props) {
  const [consumption, setConsumption] = useState<Consumption>(DEFAULT_CONSUMPTION);

  const reset = useCallback(() => setConsumption(DEFAULT_CONSUMPTION), []);

  const updateField = (field: keyof Omit<Consumption, "nutritionPerHundred">) => (value: string | number) => {
    setConsumption({ ...consumption, [field]: value });
  };

  const updateDate = (dateString: string) => {
    setConsumption({ ...consumption, date: DateUtils.stringToDate(dateString) });
  };

  const totalCaloriesByAmount = NutritionUtils.caloriesByAmount(consumption.nutritionPerHundred, consumption.amount);

  return (
    <Modal opened={opened} onClose={onClose} label="Create nutrition record">
      <div className="grid grid-cols-6 gap-2 p-2">
        <TextInput
          label="Name"
          value={consumption.name}
          onChange={updateField('name')}
          className="col-span-3"
        />
        <TextInput
          label="Date"
          type="datetime-local"
          value={DateUtils.toInputFormat(consumption.date)}
          onChange={updateDate}
          className="col-span-3"
        />
        <NutritionFacts
          nutrition={consumption.nutritionPerHundred}
          onChange={updatedNutrition => setConsumption({ ...consumption, nutritionPerHundred: updatedNutrition })}
          className="col-span-full sm:col-span-3 md:col-span-2"
        />
        <TextInput type="number" label="Amount (g)" value={consumption.amount.toString()} onChange={updateField('amount')} className="col-span-2 col-start-1" />
        <div className="rounded-lg col-start-4 col-end-7 text-yellow-400 p-2 flex flex-col items-end justify-center text-sm">
          Total Calories:
          <span className="font-bold text-xl text-yellow-400 ml-2">
            {totalCaloriesByAmount.toFixed(2)} kcal
          </span>
        </div>
        <Button text="Reset" onClick={reset} />
        <Button text="Create" className="bg-violet-400 rounded-lg h-12 col-span-2 col-start-5" onClick={console.log} />
      </div>
    </Modal>
  );
}