import React, { useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import NutritionUtils from "../../utils/Nutrition";
import { targetCaloriesContext } from "../MealSummary/TargetCaloriesContext";
import ConsumptionProgressBar from "../ConsumptionProgressBar";
import { Food } from "../../types/Food";
import NumberUtils from "../../utils/Number";
import Button, { ButtonStyle } from "../Input/Button";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import ConsumptionItemImage from "./ConsumptionItemImage";

type Props = {
  mealCalories?: number;
  consumption: Food;
  onClick?: () => void;
  onRemove?: () => void;
  withImagePreview?: boolean;
};
export default function ConsumptionItem({
  mealCalories = 0,
  consumption,
  onClick,
  onRemove,
  withImagePreview,
}: Props) {
  const targetCalories = useContext(targetCaloriesContext);
  const imageRef = useRef<Blob | null>(null);

  useEffect(() => {
    if (!withImagePreview) return;

    ConsumptionDatabase.getOrCreateFoodDetailByRecord(consumption).then(
      (foodDetail) => {
        imageRef.current = foodDetail?.image ?? null;
      }
    );
  }, [consumption, withImagePreview]);
  const itemCalories = NutritionUtils.caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );
  const calorieRatioAgainstMeal = NumberUtils.safeDivide(
    itemCalories,
    mealCalories
  );

  return (
    <div
      className="flex-shrink-0 flex items-center w-full h-14 py-2 gap-1"
      onClick={onClick}
    >
      {onRemove && (
        <Button
          icon="trash"
          buttonStyle={ButtonStyle.Clear}
          onClick={onRemove}
          className="flex-shrink-0 h-14 self-center w-16"
          textClassName="text-red-500"
        />
      )}
      {withImagePreview && <ConsumptionItemImage consumption={consumption} />}
      <div className="flex-1 flex flex-col items-stretch gap-1 overflow-hidden">
        <span
          className={classNames(
            "overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-700 capitalize text-sm"
          )}
        >
          {consumption.name}{" "}
        </span>
        <div className="flex items-center gap-1 overflow-hidden">
          <i className="text-xs lowercase">
            ({consumption.amount.toFixed(1)} g)
          </i>
          <ConsumptionProgressBar
            className="flex-1 h-1"
            targetCalories={targetCalories}
            consumption={consumption}
          />
        </div>
      </div>
      <div className="flex-shrink-0 w-20 flex flex-col items-start justify-center">
        <span className="font-bold text-sm text-right">
          {itemCalories.toFixed(1)} kcal
        </span>
        <span className="text-xs text-yellow-700">
          {(calorieRatioAgainstMeal * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
