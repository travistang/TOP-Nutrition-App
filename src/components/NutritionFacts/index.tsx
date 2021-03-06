import React from "react";
import classNames from "classnames";
import { MarcoNutrition, Nutrition } from "../../types/Nutrition";
import ItemRow from "./ItemRow";
import NutritionUtils from "../../utils/Nutrition";

type Props = {
  className?: string;
  nutrition: Nutrition;
  unit?: string;
  onChange?: (nutrition: Nutrition) => void;
};
export default function NutritionFacts({
  className,
  nutrition,
  unit = 'per 100g',
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
        "border-4 border-gray-100 rounded-lg p-2 overflow-hidden grid grid-cols-6",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2 col-span-full py-2">
        <span className="font-bold text-lg text-gray-100 text-ellipsis ">
          Nutrition Facts
        </span>
        {unit && (
          <span className="font-bold text-sm text-gray-100 text-ellipsis align-self-bottom flex-1">
            ({unit})
          </span>
        )}
      </div>
      <ItemRow
        className="bg-blue-900 -mx-2 px-2 py-1"
        value={nutrition.calories}
        label="Calories"
        onChange={editable ? updateCalories : undefined}
        unit="kcal"
      />
      {Object.values(MarcoNutrition).map((marcoNutrition) => (
        <ItemRow
          key={marcoNutrition}
          value={nutrition[marcoNutrition]}
          label={marcoNutrition}
          onChange={editable ? updateNutrition(marcoNutrition) : undefined}
          className="not:last-child:border-b"
          unit="g"
        />
      ))}
    </div>
  );
}
