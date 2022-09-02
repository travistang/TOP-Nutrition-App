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
    <div className={classNames("relative flex flex-col justify-center overflow-hidden items-stretch", className)}>
      <ProgressBar data={[{ name: label, value, color }]} totalValue={maxValue} className="h-2 w-full" />
      <div className="flex flex-nowrap justify-between items-center">
        <span className="font-bold text-xl">{value}{unit}</span>
        <span className="text-xs">goal: {maxValue} {unit}</span>
      </div>
    </div>
  )
}