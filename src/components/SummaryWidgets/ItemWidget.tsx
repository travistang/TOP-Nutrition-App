import React from "react";
import classNames from "classnames";
import ProgressBar from "../ProgressBar";

type Props = {
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  className?: string;
  themeColor?: string;
};
export default function ItemWidget({
  name,
  value,
  maxValue,
  unit,
  className,
  themeColor = "rgb(0,0,0)",
}: Props) {
  const progressBarData = [{ name, value, color: themeColor }];

  return (
    <div className={classNames("grid grid-cols-6 items-center", className)}>
      <span
        className="font-bold text-sm leading-3 col-span-2 capitalize"
        style={{ color: themeColor }}
      >
        {name}
      </span>
      <div className="font-bold col-span-4 text-lg text-right">
        <span className="text-lg font-bold" style={{ color: themeColor }}>
          {value.toFixed(1)}
        </span>
        <span className="text-xs text-gray-500">
          /{maxValue} {unit}
        </span>
      </div>
      <ProgressBar
        className="col-span-full h-1"
        data={progressBarData}
        totalValue={maxValue}
      />
    </div>
  );
}
