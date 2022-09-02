import React from 'react';
import ProgressBar from '../ProgressBar';
import Section from '../Section';

type Props = {
  label: string;
  className?: string;
  value: number;
  totalValue: number;
  color: string;
  unit?: string;
}
export default function ProgressBarWidget({ label, className, value, color, totalValue, unit }:Props) {
  return (
    <Section label={label} className={className}>
      <div className="flex flex-nowrap items-center gap-1">
        <span className="text-xl font-bold" style={{color}}>{value.toFixed(1)}{unit}</span>
        <span className="text-xs">/{totalValue.toFixed(1)}{unit}</span>
      </div>
      <ProgressBar
        totalValue={totalValue}
        data={[{ name: 'data', value, color }]}
        className="w-full h-2" />
    </Section>
  )
}