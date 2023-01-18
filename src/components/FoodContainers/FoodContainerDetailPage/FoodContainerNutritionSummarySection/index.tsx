import React from 'react';
import { FoodContainer } from '../../../../types/FoodContainer';
import { MarcoNutrition } from '../../../../types/Nutrition';
import FoodContainerUtils from '../../../../utils/FoodContainer';
import NutritionUtils from '../../../../utils/Nutrition';
import NutritionRatioBar from '../../../NutritionRatioBar';
import Section from '../../../Section';
import TextSection from '../../../TextSection';

type Props = {
  foodContainer: FoodContainer;
}
export default function FoodContainerNutritionSummarySection({ foodContainer }: Props) {
  if (foodContainer.content.length === 0) return null;
  const nutritionInContainer = FoodContainerUtils.nutritionInContainer(foodContainer);
  const totalCalories = NutritionUtils.totalCalories(nutritionInContainer);

  return (
    <>
      {Object.values(MarcoNutrition).map(marco => (
        <TextSection
          key={marco}
          className="col-span-2"
          textClassName="text-xl font-bold"
          title={marco}
          text={`${nutritionInContainer[marco].toFixed(1)} g`}
        />
      ))}
      <Section label="Nutrition distribution by calories" className="col-span-4" >
        <NutritionRatioBar nutrition={nutritionInContainer} className="h-4 mt-2 w-full" />
      </Section>
      <TextSection
        textClassName='text-xl font-bold'
        className="col-span-2"
        title="Calories"
        text={`${totalCalories.toFixed(1)} kcal`}
      />
    </>
  )

}