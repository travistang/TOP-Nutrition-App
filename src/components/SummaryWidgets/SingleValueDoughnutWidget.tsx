import { ChartData } from 'chart.js';
import React from 'react';
import DoughnutWidget from './DoughnutWidget';

type Props = {
  value: number;
  totalValue: number;
  className?: string;
  label: string;
  color: string;
  unit: string;
};

export default function SingleValueDoughnutWidget({
  unit,
  value,
  totalValue,
  label,
  className,
  color
}: Props) {
  const data: ChartData<"doughnut"> = {
    labels: [label, "Remaining"],
    datasets: [
      {
        label,
        data: [value, Math.max(0, totalValue - value)],
        backgroundColor: [color, 'rgb(200, 200, 200)'],
        borderWidth: 0,
        borderRadius: 1,
      },
    ],
  };

  return (
    <DoughnutWidget data={data} label={label} className={className}>
      <div className="flex flex-nowrap items-center gap-1 justify-end">
        <span className="text-sm font-bold" style={{ color }}>{value.toFixed(1)} {unit}</span>
        <span className="text-xs">/{totalValue.toFixed(1)} {unit}</span>

      </div>
    </DoughnutWidget>
  )
}