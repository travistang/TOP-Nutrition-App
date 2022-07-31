import React from "react";
import InputBase from "./InputBase";

type Props = {
  label: string;
  className?: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
} & (
  | {
      multiSelect: true;
      values: string[];
    }
  | {
      multiSelect?: false;
      value: string;
    }
);

export default function SelectInput({
  label,
  className,
  options,
  onSelect,
  multiSelect,
  ...valueOrValues
}: Props) {
  const valueAsSingleSelect = (valueOrValues as { value: string }).value;
  const selectedValue = valueAsSingleSelect
    ? [valueAsSingleSelect]
    : (valueOrValues as { values: string[] }).values;

  return (
    <InputBase label={label} className={className}>
      <select
        multiple={multiSelect}
        onChange={(e) => onSelect(e.target.value)}
        className="rounded-lg bg-blue-600 text-gray-200 h-12 px-2"
      >
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value}
            selected={selectedValue.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </InputBase>
  );
}
