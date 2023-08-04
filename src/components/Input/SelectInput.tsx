import classNames from "classnames";
import InputBase from "./InputBase";

type Props = {
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
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
  inputClassName,
  labelClassName,
  options,
  onSelect,
  multiSelect,
  ...valueOrValues
}: Props) {
  const valueAsSingleSelect = (valueOrValues as { value: string }).value;
  const selectedValue =
    valueAsSingleSelect !== undefined
      ? [valueAsSingleSelect]
      : (valueOrValues as { values: string[] }).values;
  return (
    <InputBase
      label={label}
      className={className}
      labelClassName={labelClassName}
    >
      <select
        multiple={multiSelect}
        onChange={(e) => onSelect(e.target.value)}
        className={classNames(
          "rounded-lg text-gray-200 h-12 px-2",
          inputClassName ?? "bg-gray-400"
        )}
      >
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value}
            selected={selectedValue?.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </InputBase>
  );
}
