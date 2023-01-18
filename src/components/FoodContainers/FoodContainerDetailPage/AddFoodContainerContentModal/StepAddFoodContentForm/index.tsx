import React, { useState } from 'react';
import ProgressiveForm from '../../../../ProgressiveForm';
import { ProgressiveFormConfig, ProgressiveFormContextValue, ProgressiveFormStep } from '../../../../ProgressiveForm/context';
import StepAddFoodContentFormContextProvder from './stepAddFoodContentFormContext';
import { AddFoodContainerContentStep, AddFoodContainerStepIconMap } from './types';
import { getNextStep} from './stepConfig';
import { DEFAULT_FOOD, Food } from '../../../../../types/Food';
import FoodForm from './FoodForm';
import NutritionForm from './NutritionForm';
import AmountForm from './AmountForm';

export const FormComponentMap: Record<AddFoodContainerContentStep, React.FC<any>> = {
  [AddFoodContainerContentStep.Food]: FoodForm,
  [AddFoodContainerContentStep.Nutrition]: NutritionForm,
  [AddFoodContainerContentStep.Amount]: AmountForm,
};


const steps: ProgressiveFormStep[] = Object.values(AddFoodContainerContentStep)
  .filter((n) => !Number.isNaN(parseInt(n as string)))
  .map((step) => ({
    icon: AddFoodContainerStepIconMap[step as AddFoodContainerContentStep],
    formComponent: FormComponentMap[step as AddFoodContainerContentStep],
    key: step.toString()
  }));

type Props = {
  onAddFoodContent: (food: Food) => void;
  onClose: () => void;
}
export default function StepAddFoodContentForm({ onClose, onAddFoodContent }: Props) {
  const [food, setFood] = useState<Food>(DEFAULT_FOOD);
  const onSubmit = (progressiveFormContext: ProgressiveFormContextValue) => {
    if (!food) return;
    onAddFoodContent(food);
    if (!progressiveFormContext.restartOnComplete) {
      onClose();
    }
  }
  const config: ProgressiveFormConfig = {
    steps,
    onSubmit: onSubmit,
    onRestart: () => setFood(DEFAULT_FOOD),
    nextStep: (step) => getNextStep(step, food)
  };

  return (
    <StepAddFoodContentFormContextProvder food={food} setFood={setFood}>
      <ProgressiveForm config={config} />
    </StepAddFoodContentFormContextProvder>
  )
}