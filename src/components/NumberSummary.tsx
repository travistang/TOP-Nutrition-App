import React from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  value: string;
  className?: string;
}
export default function NumberSummary({ label, value, className}:Props) {
  return (
    <div className={classNames("text-yellow-400 p-2 flex flex-col items-end justify-center text-sm", className)}>
      {label}
      <span className="font-bold text-xl text-yellow-400 ml-2 whitespace-nowrap">
        {value}
      </span>
    </div>
  );

}