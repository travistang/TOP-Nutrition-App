import { Food } from "../../../../../types/Food";
import { AddFoodContainerContentStep } from "./types";

export const getNextStep = (
  step: number,
  food: Food | null,
): number | null => {
  switch (step) {
    case AddFoodContainerContentStep.Food:
      if (!food?.name) return null;
      return AddFoodContainerContentStep.Nutrition;
    case AddFoodContainerContentStep.Nutrition:
      return AddFoodContainerContentStep.Amount;
    case AddFoodContainerContentStep.Amount:
      return !!food?.amount ? step + 1 : null;
    default:
      return step + 1;
  }
};