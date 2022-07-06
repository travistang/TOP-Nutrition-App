import classNames from 'classnames';
import React from 'react';
import NumberUtils from '../utils/Number';

type Props = {
  className?: string;
  data: { name: string, value: number, color: string; }[];
  totalValue?: number;
};

export default function ProgressBar({ className, data, totalValue }:Props) {
  const usingValue = totalValue ?? NumberUtils.sum(...data.map(d => d.value));
  return (
    <div className={classNames("rounded-full flex bg-gray-400", className)}>
      {
        data.map((dat => (
          <span
            className="first:rounded-l-full last:rounded-r-full"
            style={{ width: `${dat.value / usingValue * 100}%`, backgroundColor: dat.color }}
          />
        )))
      }
    </div>
  )
}