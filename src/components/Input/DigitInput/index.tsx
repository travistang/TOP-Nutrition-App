import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import useInitialValue from '../../../hooks/useInitialValue';
import Keypad from './Keypad';
import { addDigit, removeDigit, numberToString, stringToNumber, displayValue } from './utils/digitLogic';

type Props = {
  defaultValue: number;
  onChange: (newValue: number) => void;
  unit?: string;
  className?: string;
  integer?: boolean;
};



export default function DigitInput({ integer, defaultValue, onChange, className, unit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [digitString, setDigitString] = useState('');
  const initialValue = useInitialValue(defaultValue);
  useEffect(() => {
    if (initialValue !== null) {
      setDigitString(numberToString(initialValue, integer));
    }

  }, [initialValue, integer]);

  const inputDigit = (n: number) => {
    const newString = addDigit(digitString, n);
    setDigitString(newString);
    onChange(stringToNumber(newString, integer));
  };

  const deleteDigit = () => {
    const newString = removeDigit(digitString);
    setDigitString(newString);
    onChange(stringToNumber(newString, integer));
  }

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <div className="flex flex-row flex-nowrap items-end gap-4">
        <div
          onClick={() => inputRef.current?.focus()}
          className={classNames(
            "rounded-lg  p-2 flex flex-nowrap flex-1",
          )}
        >
          <span className="text-4xl flex-1 text-right">
            {displayValue(digitString, integer)}
          </span>
        </div>
        {unit && <span className="text-3xl">{unit}</span>}
      </div>
      <Keypad onDigitInput={inputDigit} onBackspace={deleteDigit} />
    </div>
  );
}