import React, { useEffect, useState } from "react";
import InputBase, { InputBaseProps } from "./InputBase";
import NumberUtils from "../../utils/Number";

export type NumberInputProps = Omit<InputBaseProps, "children"> & {
  value: number;
  onChange: (value: number) => void;
};

export default function NumberInput({
  label,
  className,
  value,
  onChange,
}: NumberInputProps) {
  const [inputPlaceholder, setInputPlaceholder] = useState(value.toString());
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputString = e.target.value;

    const isInputValidNumber = NumberUtils.isNumeric(inputString);
    if (!isInputValidNumber) {
      return;
    }

    setInputPlaceholder(inputString);

    if (!inputString.length) {
      onChange(0);
      return;
    }
    onChange(NumberUtils.stringToFloat(inputString));
  };

  useEffect(() => {
    setInputPlaceholder(value.toString());
  }, [value]);

  return (
    <InputBase label={label} className={className}>
      <div className="rounded-lg h-12 px-2 bg-gray-400 flex items-center overflow-hidden">
        <input
          type="text"
          pattern="\d*"
          lang="en"
          min="0"
          step="0.1"
          inputMode="decimal"
          className="bg-transparent outline-none flex-1 text-gray-100"
          value={inputPlaceholder}
          onChange={handleChange}
        />
      </div>
    </InputBase>
  );
}
