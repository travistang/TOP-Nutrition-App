import React from 'react';
import { format } from 'date-fns';
import { useSetRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createEditRecordAtom } from '../../atoms/CreateEditRecordAtom';
import { ConsumptionRecord } from '../../database/ConsumptionDatabase';
import { Consumption } from '../../types/Consumption';
import ConsumptionItem from '../ConsumptionItem';
import MealUtils from '../../utils/Meal';
import NumberUtils from '../../utils/Number';
import Chip from '../Chip';
import { MarcoNutritionColor } from '../../types/Nutrition';
import { splitMealModalAtom } from '../../atoms/SplitMealModalAtom';

type Props = {
  meal: ConsumptionRecord[];
  caloriesIntakeOfDay: number;
  index: number;
};
export default function MealSummary({ caloriesIntakeOfDay, meal, index }: Props) {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const setSplitMealModal = useSetRecoilState(splitMealModalAtom);

  const editRecord = (consumption: Consumption) => () => {
    setCreateEditRecord({
      modalOpened: true,
      record: consumption,
    });
  };

  const mealCalories = MealUtils.totalNutrition(meal).calories;
  const caloriesRatioAgainstTotal = mealCalories / caloriesIntakeOfDay;

  const openSplitMealModal = () => {
    setSplitMealModal({ modalOpened: true, meal })
  }

  return (
    <div
      key={meal[0].id}
      className="rounded-lg flex flex-col px-2 pb-2 flex-shrink-0 bg-gray-300 mb-2"
    >
      <div className="flex-shirnk-0 sticky top-0 rounded-t-lg h-12 flex flex-row items-center justify-between bg-gray-300 shadow-md -mx-2 px-2">
        <span className="text-gray-500">Meal {index + 1} @ {format(meal[0].date, 'HH:mm')}</span>
        <div className="flex items-center gap-1">
          <span className="mx-2 items-center font-bold text-xs rounded-full text-yellow-700">
            Daily {NumberUtils.ratioToPercentageString(caloriesRatioAgainstTotal)}
          </span>
          <Chip
            text={`${mealCalories.toFixed(1)} kcal`}
            color={MarcoNutritionColor.protein}
            className="h-6 items-center flex text-gray-100 text-xs px-2 justify-flex-end"
          />
          <FontAwesomeIcon
            onClick={openSplitMealModal}
            icon="pen"
            className="h-2 w-2 rounded-full p-2 bg-gray-400"
          />
        </div>
      </div>
      {meal.map((consumption) => (
        <ConsumptionItem
          key={consumption.id}
          mealCalories={mealCalories}
          consumption={consumption}
          onClick={editRecord(consumption)}
        />
      ))}
    </div>
  );
}
