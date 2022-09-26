import classNames from 'classnames';
import React from 'react';
import Button from '../Button';

type Props = {
  className?: string;
  onDigitInput: (n: number) => void;
  onBackspace: () => void;
}
export default function Keypad({ className, onDigitInput, onBackspace }: Props) {
  return (
    <div className={classNames("grid grid-cols-3 gap-2 rtl", className)}>
      {[7,8,9,4,5,6,1,2,3].map(i => (
        <Button
          className="h-10"
          text={i.toString()}
          key={i}
          onClick={() => onDigitInput(i)}
        />
      ))}
      <Button className="col-span-2 h-10" text={'0'} onClick={() => onDigitInput(0)} />
      <Button
        className="h-10 bg-gray-600"
        textClassName='child:fill-gray-50'
        icon='arrow-left'
        onClick={onBackspace}
      />
    </div>
  )
}