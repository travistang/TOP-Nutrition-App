import classNames from 'classnames';
import React from 'react';
import ProgressBar from '../ProgressBar';

type Props = {
  label: string;
  value: number;
  maxValue: number;
  className?: string;
  color: string;
  unit?: string;
}


export default function GaugeWidget({ value, maxValue, className, color, unit, label }:Props) {

  return (
    <div className={classNames("relative flex flex-col justify-center items-center overflow-hidden", className)}>
      <ProgressBar data={[{ name: label, value, color }]} totalValue={maxValue} className="h-4 w-full" />
      <div className="flex flex-nowrap items-center self-end gap-2">
        <span className="font-bold text-md" style={{ color }}>{value}{unit}</span>
        <span className="text-xs">/{maxValue} {unit}</span>
      </div>
    </div>
  )
}