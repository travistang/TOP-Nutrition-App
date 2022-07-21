import classNames from 'classnames';
import React from 'react';
import NumberSummary from '../NumberSummary';

type Props = {
  label: string;
  ratio: number;
  mealWeight: number;
  className?: string;
};
export default function PortionSummary({ label, ratio, mealWeight, className }: Props) {
  const summaryString = `≈${(mealWeight * ratio).toFixed(2)}g, ${(
    ratio * 100
  ).toFixed(0)}%`;
  return (
    <NumberSummary
      label={label}
      value={summaryString}
      className={classNames("flex flex-col col-span-3 gap-1", className)} />
  );
}