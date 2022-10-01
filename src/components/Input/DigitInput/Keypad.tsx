import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React from 'react';
import Button from '../Button';

export type ButtonConfig = {
  icon: IconProp;
  onClick: () => void;
  className?: string;
  textClassName?: string;
};
export type KeypadConfig = {
  left?: ButtonConfig;
  right?: ButtonConfig;
};

type Props = {
  className?: string;
  onDigitInput: (n: number) => void;
  onBackspace: () => void;
  keypadConfig?: KeypadConfig;
}

export default function Keypad({
  className, onDigitInput, onBackspace,
  keypadConfig
}: Props) {
  const { left, right } = keypadConfig ?? {};
  const commonButtonClassName = 'h-10';
  return (
    <div className={classNames("grid grid-cols-3 gap-2 rtl", className)}>
      {[7,8,9,4,5,6,1,2,3].map(i => (
        <Button
          className={commonButtonClassName}
          text={i.toString()}
          key={i}
          onClick={() => onDigitInput(i)}
        />
      ))}
      <Button
        className={classNames(commonButtonClassName, left?.className ?? "bg-gray-600")}
        textClassName={classNames(left?.textClassName, 'child:fill-gray-50')}
        icon={left?.icon ?? 'arrow-left'}
        onClick={left?.onClick ?? onBackspace}
      />
      <Button
        className={classNames(commonButtonClassName, right ? "col-span-1" : "col-span-2")}
        text={'0'}
        onClick={() => onDigitInput(0)}
      />
      {right && (
        <Button
          className={classNames(commonButtonClassName, right.className)}
          textClassName={right.textClassName}
          icon={right.icon}
          onClick={right.onClick}
        />
      )}
    </div>
  )
}