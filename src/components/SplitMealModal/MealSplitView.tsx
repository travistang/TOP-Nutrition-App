import { useMemo } from "react";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import NutritionUtils from "../../utils/Nutrition";
import InputBase from "../Input/InputBase";
import PortionSummary from "./PortionSummary";

type Props = {
  splitRatio: number;
  onChangeRatio: (r: number) => void;
  meal: ConsumptionRecord[];
};
export default function MealSplitView({
  meal,
  splitRatio,
  onChangeRatio,
}: Props) {
  const mealNutrition = useMemo(
    () =>
      NutritionUtils.total(
        ...meal.map(NutritionUtils.nutritionFromConsumption)
      ),
    [meal]
  );
  const currentMealCalories = NutritionUtils.multiply(
    mealNutrition,
    1 - splitRatio
  ).calories;
  const nextMealCalories = NutritionUtils.multiply(
    mealNutrition,
    splitRatio
  ).calories;

  return (
    <>
      <PortionSummary
        title="Current Meal"
        calories={currentMealCalories}
        ratio={1 - splitRatio}
      />
      <InputBase className="col-span-full">
        <input
          value={splitRatio}
          onChange={(e) => onChangeRatio(e.target.valueAsNumber)}
          type="range"
          min={0}
          max={1}
          step={0.01}
        />
      </InputBase>
      <PortionSummary
        title="Next Meal"
        className="self-end flex-row-reverse"
        calories={nextMealCalories}
        ratio={splitRatio}
        reversed
      />
    </>
  );
}
