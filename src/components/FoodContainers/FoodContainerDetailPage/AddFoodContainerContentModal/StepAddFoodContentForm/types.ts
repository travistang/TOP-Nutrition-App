import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum AddFoodContainerContentStep {
  Food = 0,
  Nutrition = 1,
  Amount = 2
}

export const AddFoodContainerStepIconMap: Record<
  AddFoodContainerContentStep,
  IconProp
> = {
  [AddFoodContainerContentStep.Food]: "tag",
  [AddFoodContainerContentStep.Nutrition]: "pie-chart",
  [AddFoodContainerContentStep.Amount]: "weight-hanging",
};