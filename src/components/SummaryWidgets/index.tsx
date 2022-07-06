import React from 'react';
import { useRecoilValue } from 'recoil';
import { dailyNutritionGoalAtom } from '../../atoms/DailyNutritionGoalAtom';
import { MarcoNutrition, MarcoNutritionColor, Nutrition } from '../../types/Nutrition';
import NutritionUtils from '../../utils/Nutrition';
import CalorieWidget from './CalorieWidget';
import ItemWidget from './ItemWidget';

type Props = {
  nutritionRecords: Nutrition[];
}
export default function SummaryWidgets({ nutritionRecords}: Props) {
  const { targetCalories, targetNutritionIntake } = useRecoilValue(dailyNutritionGoalAtom);
  const totalNutritions = NutritionUtils.total(...nutritionRecords);
  const caloriesByNutrition = NutritionUtils.caloriesByNutrition(totalNutritions);
  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <CalorieWidget caloriesByNutrition={caloriesByNutrition} remainingCalories={Math.max(0, targetCalories - totalNutritions.calories)} />
      <div className="flex-1 flex flex-col items-stretch gap-1">
        <ItemWidget name="Calories" value={totalNutritions.calories} maxValue={targetCalories} unit="kcal" themeColor="rgb(100, 0, 0)" className="" />
        {Object.values(MarcoNutrition).map(marco => (
          <ItemWidget
            key={marco}
            name={marco}
            value={totalNutritions[marco]}
            maxValue={targetNutritionIntake[marco]}
            unit="g"
            themeColor={MarcoNutritionColor[marco]}
            className=""
          />
        ))}
      </div>
    </div>
  )
}