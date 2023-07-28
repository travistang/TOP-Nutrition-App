import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import { Food } from "../../types/Food";
import NumberUtils from "../../utils/Number";
import NutritionUtils from "../../utils/Nutrition";
import ConsumptionProgressBar from "../ConsumptionProgressBar";
import ImageViewer from "../ImageViewer";
import Button, { ButtonStyle } from "../Input/Button";
import { targetCaloriesContext } from "../MealSummary/TargetCaloriesContext";

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
  onRemove,
}: Props) {
  const targetCalories = useContext(targetCaloriesContext);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  useEffect(() => {
    ConsumptionDatabase.getOrCreateFoodDetailByRecord(consumption).then(
      (foodDetail) => {
        setImageBlob(foodDetail?.image ?? null);
      }
    );
  }, [consumption]);
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
      <ImageViewer className="h-full" image={imageBlob} />
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
