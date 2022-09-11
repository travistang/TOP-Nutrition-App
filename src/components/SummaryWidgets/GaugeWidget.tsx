import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import ProgressBar from "../ProgressBar";
import NumberUtils from '../../utils/Number';

type Props = {
  label: string;
  value: number;
  maxValue: number | null;
  className?: string;
  color: string;
  unit?: string;
};

export default function GaugeWidget({
  value,
  maxValue,
  className,
  color,
  unit,
  label,
}: Props) {
  const hasMaxValue = maxValue !== null;
  return (
    <div
      className={classNames(
        "relative flex flex-col justify-center overflow-hidden items-stretch",
        className
      )}
    >
      <div className="flex w-full items-center justify-end">
        <span className="text-gray-500 font-bold text-xs self-start">
          {hasMaxValue ? NumberUtils.ratioToPercentageString(value / maxValue) : ''}
        </span>
      </div>
      <ProgressBar
        data={[{ name: label, value, color }]}
        totalValue={maxValue ?? undefined}
        className="h-2 w-full"
      />
      <div className="flex flex-nowrap justify-between items-center">
        <span className="text-xs">
          <FontAwesomeIcon icon='trophy' className="w-3 h-3 mr-2" />{
            hasMaxValue ? `${maxValue!.toFixed(0)} ${unit}` : "--"
          }
        </span>
        <span className="font-bold text-xl self-end">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
    </div>
  );
}
