import React, { useContext } from 'react';
import { MarcoNutrition } from '../../../../../types/Nutrition';
import { progressiveFormContext } from '../../../../ProgressiveForm/context';
import PureNutritionForm from '../../../../ProgressiveForm/NutritionForm';
import { stepAddFoodContentFormContext } from './stepAddFoodContentFormContext';
import ObjectUtils from '../../../../../utils/Object';
import NutritionUtils from '../../../../../utils/Nutrition';

export default function NutritionForm() {
  const { food, setFood } = useContext(stepAddFoodContentFormContext);
  const { nextStep } = useContext(progressiveFormContext);
  const onUpdateNutrition = (marco: MarcoNutrition | 'calories') =>
    (value: number) => {
      if (marco === 'calories') {
        setFood(ObjectUtils.deepUpdate(food, `nutritionPerHundred.calories`, value));
        return;
      }
      const updatedNutrition = { ...food.nutritionPerHundred, [marco]: value };
      const computedCalories = NutritionUtils.totalCalories(updatedNutrition);
      const finalNutrition = {
        ...updatedNutrition,
        calories: computedCalories
      }
      setFood(ObjectUtils.deepUpdate(food, 'nutritionPerHundred', finalNutrition));
    }

  return (
    <PureNutritionForm
      nutrition={food.nutritionPerHundred}
      onProceed={nextStep}
      onUpdate={onUpdateNutrition}
    />
  );
}