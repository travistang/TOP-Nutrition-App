import React, { useEffect, useState } from 'react';

type Props = {
  value: number;
  onChange: (n: number) => void;
  integer?: boolean;
}
export default function useDigitLogic({value, onChange, integer }: Props) {
  const [valueHundred, setValueHundred] = useState(0);

  useEffect(() => {
    setValueHundred(Math.floor(value * 100));
  }, [value]);

  const reportChange = (newValueHundred: number) => {
    if (integer) {
      onChange(Math.floor(newValueHundred / 100));
    } else {
      onChange(newValueHundred / 100);
    }
  }
  const addDigit = (n: number) => {
    const newValue = parseFloat(`${valueHundred}${n}`);
    reportChange(newValue);
  }

  const removeDigit = () => {
    const newValue = Math.floor(valueHundred / 10);
    reportChange(newValue);

  }

  return {valueHundred, addDigit, removeDigit};
}