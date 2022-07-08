import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConsumptionDatabase from '../database/ConsumptionDatabase';
import SummaryWidgets from '../components/SummaryWidgets';
import NutritionUtils from '../utils/Nutrition';
import DateUtils from '../utils/Date';
import MealSummary from '../components/MealSummary';

export default function ConsumptionSummary() {
  const consumptionsOfDay = useLiveQuery(() => {
    return ConsumptionDatabase.consumptionsOfDay();
  });
  const consumptionsByMeals = DateUtils.groupByTimeInterval(consumptionsOfDay ?? [], 30);
  const nutritionRecords = consumptionsOfDay?.map(NutritionUtils.nutritionFromConsumption) ?? [];

  return (
    <div className='flex flex-col overflow-y-auto flex-1 items-stretch'>
      <div className="flex flex-no-wrap items-center text-xs gap-1 pl-1 pb-1">
        <span>Statistics today</span>
      </div>
      <SummaryWidgets nutritionRecords={nutritionRecords} />
      <div className="flex flex-no-wrap pt-8 items-center text-xs gap-1 pb-2">
        <span>Meals today</span>
      </div>
      <div className="flex flex-col min-h-1/2 overflow-y-auto pb-16">
        {!consumptionsOfDay?.length && (
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-sm">
            <FontAwesomeIcon icon="hamburger" className="text-3xl" />
            You haven't eatten anything yet today...
          </div>
        )}
        {
          consumptionsByMeals?.map((meal, index) => (
            <MealSummary meal={meal} index={index} key={meal[0].id} />
          ))
        }
      </div>
    </div>
  )
}