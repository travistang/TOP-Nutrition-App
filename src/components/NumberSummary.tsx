import React from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  value: string;
  className?: string;
}
export default function NumberSummary({ label, value, className}:Props) {
  return (
    <div className={classNames("rounded-lg p-2 flex flex-col items-end justify-center text-xs", className)}>
      {label}
      <span className="font-bold text-xl ml-2 whitespace-nowrap text-blue-500">
        {value}
      </span>
    </div>
  );

}