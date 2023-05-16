import classNames from "classnames";
import React from "react";
import { Nutrition } from "../../../types/Nutrition";

type Props = {
  field: keyof Nutrition;
  onSelect?: () => void;
  selected?: boolean;
  value: number;
};
export default function NutritionTooltip({
  field,
  onSelect,
  selected = false,
  value,
}: Props) {
  const unit = field === "calories" ? "kcal" : "g";
  return (
    <div
      key={field}
      onClick={onSelect}
      className={classNames(
        "z-10 relative flex flex-col flex-1 items-center justify-center py-2 rounded-lg",
        selected && "bg-gray-900 child:text-gray-50"
      )}
    >
      <span className="text-xs">{field}</span>
      <div className="flex items-end font-bold text-lg">
        {value.toFixed(1)}
        <span className="font-bold text-sm">{unit}</span>
      </div>
      <span
        className={
          !selected
            ? "hidden"
            : "absolute bottom-0 left-auto right-auto h-8 w-8 -z-10 rotate-45 bg-gray-900"
        }
      />
    </div>
  );
}
