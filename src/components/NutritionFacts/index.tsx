import React from "react";
import classNames from "classnames";
import { MarcoNutrition, Nutrition } from "../../types/Nutrition";
import ItemRow from "./ItemRow";
import NutritionUtils from "../../utils/Nutrition";

type Props = {
  className?: string;
  nutrition: Nutrition;
  servingNutrition?: Nutrition & { amount: number };
  unit?: string;
  onChange?: (nutrition: Nutrition) => void;
};
export default function NutritionFacts({
  className,
  nutrition,
  servingNutrition,
  unit = "g",
  onChange,
}: Props) {
  const editable = !!onChange;

  const updateNutrition = (marco: MarcoNutrition) => (value: number) => {
    const updatedNutrition: Nutrition = {
      ...nutrition,
      [marco]: value,
    };
    const totalCalories = NutritionUtils.totalCalories(updatedNutrition);
    const derivedNutrition: Nutrition = {
      ...updatedNutrition,
      calories: totalCalories,
    };
    onChange?.(derivedNutrition);
  };

  const updateCalories = (value: number) => {
    onChange?.({ ...nutrition, calories: value });
  };

  return (
    <div
      className={classNames(
        "border-4 border-gray-500 rounded-lg p-2 overflow-hidden grid grid-cols-6",
        className
      )}
    >
      <div className="grid grid-cols-6 items-center gap-2 col-span-full py-2">
        <span className="font-bold text-lg text-ellipsis col-span-3 text-gray-900">
          Nutrition Facts
        </span>
        {unit && (
          <span className="font-bold text-sm text-ellipsis align-self-bottom flex-1 text-gray-900">
            100{unit}
          </span>
        )}
        {servingNutrition && (
          <span className="text-right font-bold text-sm text-ellipsis align-self-bottom flex-1 text-gray-900">
            {servingNutrition.amount.toFixed(1)}
            {unit}
          </span>
        )}
      </div>
      <ItemRow
        className="bg-gray-500 -mx-2 px-2 pt-1 pb-2"
        value={nutrition.calories}
        secondValue={servingNutrition?.calories}
        label="Calories"
        onChange={editable ? updateCalories : undefined}
        unit="kcal"
      />
      {Object.values(MarcoNutrition).map((marcoNutrition) => (
        <ItemRow
          key={marcoNutrition}
          value={nutrition[marcoNutrition]}
          secondValue={servingNutrition?.[marcoNutrition]}
          label={marcoNutrition}
          onChange={editable ? updateNutrition(marcoNutrition) : undefined}
          className="not:last-child:border-b"
          unit="g"
        />
      ))}
    </div>
  );
}
