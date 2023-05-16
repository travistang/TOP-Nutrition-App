import React from "react";
import classNames from "classnames";
import { Nutrition } from "../../types/Nutrition";
import NutritionTooltip from "../ProgressiveForm/NutritionForm/NutritionTooltip";

type Props = {
  className?: string;
  nutrition: Nutrition;
  onChange?: (nutrition: Nutrition) => void;
};
export default function NutritionFacts({ className, nutrition }: Props) {
  return (
    <div className={classNames("flex justify-between", className)}>
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
