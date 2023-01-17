import React, { useContext } from "react";
import NutritionUtils from "../../utils/Nutrition";
import { targetCaloriesContext } from "../MealSummary/TargetCaloriesContext";
import ConsumptionProgressBar from "../ConsumptionProgressBar";
import { Food } from "../../types/Food";
import NumberUtils from '../../utils/Number';
import Button, { ButtonStyle } from "../Input/Button";
import classNames from "classnames";

type Props = {
  mealCalories?: number;
  consumption: Food;
  onClick?: () => void;
  onRemove?: () => void;
};
export default function ConsumptionItem({
  mealCalories = 0,
  consumption,
  onClick,
  onRemove
}: Props) {
  const targetCalories = useContext(targetCaloriesContext);
  const itemCalories = NutritionUtils.caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );
  const calorieRatioAgainstMeal = NumberUtils.safeDivide(itemCalories, mealCalories);

  return (
    <div
      className="flex-shrink-0 grid grid-cols-6 items-center w-full h-14 py-2"
      onClick={onClick}
    >
      {onRemove && (
        <Button
          icon="trash"
          buttonStyle={ButtonStyle.Clear}
          onClick={onRemove}
          className="row-span-2 row-start-1 col-start-1"
          textClassName="text-red-500"
        />
      )}
      <span className={classNames(
        "font-bold text-gray-700 capitalize text-sm",
        onRemove ? 'col-span-3' : 'col-span-4'
      )}>
        {consumption.name}{" "}
        <i className="text-xs lowercase">({consumption.amount.toFixed(1)} g)</i>
      </span>
      <div className="col-span-2 flex flex-col items-end">
        <span className="font-bold text-sm text-right">
          {itemCalories.toFixed(1)} kcal
        </span>
        <span className="text-xs text-yellow-700">
          {(calorieRatioAgainstMeal * 100).toFixed(1)}% of meal
        </span>
      </div>
      <ConsumptionProgressBar
        className="col-span-4 h-1"
        targetCalories={targetCalories}
        consumption={consumption}
      />
    </div>
  );
}
