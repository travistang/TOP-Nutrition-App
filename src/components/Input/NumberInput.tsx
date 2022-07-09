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

  const onChangeFromString = (str: string) => {
    setInputPlaceholder(str);
    if (NumberUtils.isNumeric(str)) {
      onChange(NumberUtils.stringToFloat(str));
      return;
    }
  };

  useEffect(() => {
    setInputPlaceholder(value.toString());
  }, [value]);

  return (
    <InputBase label={label} className={className}>
      <div className="rounded-lg h-12 px-2 bg-blue-600 flex items-center overflow-hidden">
        <input
          type="number"
          inputMode="decimal"
          pattern="\d*"
          className="bg-transparent outline-none flex-1 text-gray-100"
          value={inputPlaceholder}
          onChange={(e) => onChangeFromString(e.target.value)}
        />
      </div>
    </InputBase>
  );
}
