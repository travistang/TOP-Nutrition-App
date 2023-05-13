import React, { useContext } from "react";
import { foodDetailContext } from "./FoodDetailContext";
import { MarcoNutrition } from "../../../types/Nutrition";
import NutritionTooltip from "../../ProgressiveForm/NutritionForm/NutritionTooltip";

const nutritionFields = [...Object.values(MarcoNutrition), "calories"] as const;
export default function FoodCaloriesSection() {
  const records = useContext(foodDetailContext);
  const firstRecord = records[0];
  if (!firstRecord) return null;

  return (
    <div className="flex justify-between">
      {nutritionFields.map((field) => (
        <NutritionTooltip
          key={field}
          field={field}
          value={firstRecord.nutritionPerHundred[field]}
        />
      ))}
    </div>
  );
}
