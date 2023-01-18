import React from 'react';
import { FoodContainer } from '../../../types/FoodContainer';
import NutritionRatioBar from '../../NutritionRatioBar';
import FoodContainerUtils from '../../../utils/FoodContainer';

type Props = {
  foodContainer: FoodContainer
}
export default function FoodContainerNutritionInfo({ foodContainer }: Props) {
  if (foodContainer.content.length === 0) {
    return (
      <div className="row-start-1 col-start-3 row-span-2 flex items-center justify-end text-xs font-bold">
        Empty
      </div>
    )
  }
  const nutrition = FoodContainerUtils.nutritionInContainer(foodContainer);

  return (
    <>
      <div className="row-start-1 col-start-3 text-sm justify-self-end font-bold text-right">
        {nutrition.calories.toFixed(0)} kcal
      </div>
      <NutritionRatioBar className="h-1 self-end mb-1" nutrition={nutrition} />
    </>
  )
}