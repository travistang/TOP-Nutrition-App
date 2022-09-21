import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import NumberUtils from '../../../utils/Number';
import Keypad from './Keypad';
import useDigitLogic from './useDigitLogic';

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  unit?: string;
  className?: string;
  integer?: boolean;
  hideKeypad?: boolean;
}
export default function DigitInput({ integer, value, onChange, className, unit, hideKeypad }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);
  const { valueHundred, addDigit, removeDigit } = useDigitLogic({ value, onChange, integer });
  const onFocus = () => {
    setFocused(true);
    inputRef?.current?.focus();
  }

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value =  e.target.valueAsNumber / 100;
    onChange(Number.isFinite(value) ? value : 0);
  }

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <div onClick={onFocus} className="flex flex-row flex-nowrap items-end gap-4">
        <div
          onClick={() => inputRef.current?.focus()}
          className={classNames(
            "rounded-lg  p-2 flex flex-nowrap flex-1",
            focused ? "bg-gray-400" : "bg-gray-200"
          )}
        >
          <input
            ref={inputRef}
            disabled={!hideKeypad}
            className="hidden"
            value={value * 100}
            type="number"
            onChange={handleInput}
          />
          <span className="text-4xl flex-1 text-right">
            {NumberUtils.numberToFormattedDigit(valueHundred, integer)}
          </span>
        </div>
        {unit && <span className="text-3xl">{unit}</span>}
      </div>
      {!hideKeypad && <Keypad onDigitInput={addDigit} onBackspace={removeDigit} />}
    </div>
  )
}