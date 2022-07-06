import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useLiveQuery } from 'dexie-react-hooks';
import ConsumptionDatabase from '../database/ConsumptionDatabase';
import { createEditRecordAtom } from '../atoms/CreateEditRecordAtom';
import { Consumption } from '../types/Consumption';
import NutritionUtils from '../utils/Nutrition';
import SummaryWidgets from '../components/SummaryWidgets';
import ConsumptionItem from '../components/ConsumptionItem';

export default function ConsumptionSummary() {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const consumptionsOfDay = useLiveQuery(() => {
    return ConsumptionDatabase.consumptionsOfDay();
  });
  const nutritionRecords = consumptionsOfDay?.map(NutritionUtils.nutritionFromConsumption) ?? [];
  const maxCaloriesEntry = nutritionRecords.reduce<number>((highestCalories, nutrition) => nutrition.calories > highestCalories ? nutrition.calories : highestCalories, 0);


  const editRecord = (consumption: Consumption) => () => {
    setCreateEditRecord({
      modalOpened: true,
      record: consumption
    });
  }
  return (
    <div className='flex flex-col overflow-y-auto flex-1 items-stretch'>
      <SummaryWidgets nutritionRecords={nutritionRecords} />
      <div className="py-2 pt-8 flex flex-col h-1/2 overflow-y-auto">
        {
          consumptionsOfDay?.map(consumption => (
            <ConsumptionItem
              key={consumption.id}
              consumption={consumption}
              maxAmount={maxCaloriesEntry}
              onClick={editRecord(consumption)} />
          ))
        }
      </div>
    </div>
  )
}