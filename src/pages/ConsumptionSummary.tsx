import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useLiveQuery } from 'dexie-react-hooks';
import ConsumptionDatabase from '../database/ConsumptionDatabase';
import { createEditRecordAtom } from '../atoms/CreateEditRecordAtom';
import { Consumption } from '../types/Consumption';
import NutritionUtils from '../utils/Nutrition';
import SummaryWidgets from '../components/SummaryWidgets';
import ConsumptionItem from '../components/ConsumptionItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className="flex flex-no-wrap items-center text-xs gap-1 pl-1 pb-1">
        <span>Statistics today</span>
      </div>
      <SummaryWidgets nutritionRecords={nutritionRecords} />
      <div className="flex flex-no-wrap pt-8 items-center text-xs gap-1">
        <span>Consumptions</span>
      </div>
      <div className="flex flex-col h-1/2 overflow-y-auto">
        {!consumptionsOfDay?.length && (
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-sm">
            <FontAwesomeIcon icon="hamburger" className="text-3xl" />
            You haven't eatten anything yet today...
          </div>
        )}
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