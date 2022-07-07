import classNames from 'classnames';
import React from 'react';

export type InputBaseProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

export default function InputBase({ label, className, children }:InputBaseProps) {
  return (
    <div className={classNames("relative flex flex-col gap-2 items-stretch", className)}>
      <div className="text-sm font-bold text-gray-100 leading-3">{label}</div>
      {children}
    </div>
  )
}