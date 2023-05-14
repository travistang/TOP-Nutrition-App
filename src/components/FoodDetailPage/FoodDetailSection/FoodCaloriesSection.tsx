import React from "react";
import { Nutrition } from "../../../types/Nutrition";
import NutritionTooltip from "../../ProgressiveForm/NutritionForm/NutritionTooltip";

type Props = {
  nutrition: Nutrition;
};
export default function FoodCaloriesSection({ nutrition }: Props) {
  return (
    <div className="flex justify-between">
      {Object.entries(nutrition).map(([field, value]) => (
        <NutritionTooltip
          key={field}
          field={field as keyof Nutrition}
          value={value}
        />
      ))}
    </div>
  );
}
