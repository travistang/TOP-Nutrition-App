import { addDays } from "date-fns";
import { useState } from "react";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { splitMeal, splitMealToContainer } from "../../domain/MealSplit";

export enum SplitMealMode {
  NextMeal,
  ToContainer,
}

export type SplitMealFormValue = {
  splitRatio: number;
  nextMealDate: number;
  splitMealMode: SplitMealMode;
  targetFoodContainerId?: string;
};

export default function useSplitMealForm(meal: ConsumptionRecord[]) {
  const [
    { splitRatio, nextMealDate, splitMealMode, targetFoodContainerId },
    setForm,
  ] = useState<SplitMealFormValue>({
    splitRatio: 1,
    splitMealMode: SplitMealMode.NextMeal,
    nextMealDate: addDays(Date.now(), 1).getTime(),
  });

  const setFormValue = (key: keyof SplitMealFormValue) => (value: any) => {
    setForm((form) => ({ ...form, [key]: value }));
  };

  const isFormValid = splitRatio > 0;

  const split = async () => {
    if (!isFormValid) {
      return false;
    }

    if (splitMealMode === SplitMealMode.NextMeal) {
      try {
        await splitMeal(meal, splitRatio, nextMealDate);
        return true;
      } catch {
        return false;
      }
    }

    if (splitMealMode === SplitMealMode.ToContainer) {
      if (!targetFoodContainerId) return false;
      try {
        await splitMealToContainer(meal, splitRatio, targetFoodContainerId);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return {
    splitRatio,
    nextMealDate,
    splitMealMode,
    targetFoodContainerId,
    setFormValue,
    split,
    isFormValid,
  };
}
