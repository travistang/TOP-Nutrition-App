import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Option<T> = { value: T; label?: string; icon?: IconProp };
type BaseProps<T extends string | number> = {
  className?: string;
  label?: string;
  value: T;
  availableValues: Option<T>[];
};
type Props<T extends string | number> = BaseProps<T> &
  (
    | {
        emptyValue: undefined;
        onChange: (value: T) => void;
      }
    | {
        emptyValue: Omit<Option<T>, "value">;
        onChange: (value?: T) => void;
      }
  );

const getNextValue = <T extends string | number>(
  value: T,
  options: Option<T>[],
  emptyValue?: Omit<Option<T>, "value">
): Option<T> | Omit<Option<T>, "value"> => {
  const nullable = !!emptyValue;
  const currentIndex = options.findIndex((opt) => opt.value === value);
  if (currentIndex === -1) return options[0];
  const nextIndex = currentIndex + 1;
  if (nextIndex >= options.length) {
    return nullable ? emptyValue : options[0];
  }
  return options[nextIndex];
};
export default function RotateToggleInput<T extends string | number>({
  className,
  value,
  label,
  availableValues,
  emptyValue,
  onChange,
}: Props<T>) {
  const currentSettings =
    availableValues.find((opt) => opt.value === value) ??
    emptyValue ??
    availableValues[0];
  const onToggle = () => {
    const nextValue = getNextValue(value, availableValues, emptyValue);
    onChange(nextValue as T);
  };
  const hasValue = value !== undefined;
  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-1 h-14",
        className
      )}
    >
      {label && <span className="text-xs capitalize">{label}</span>}
      <button
        type="button"
        onClick={onToggle}
        className={classNames(
          "rounded-lg border border-gray-800 flex-1",
          "flex items-center justify-center gap-2 h-8",
          hasValue && "bg-gray-800 text-gray-100"
        )}
      >
        {currentSettings.icon && (
          <FontAwesomeIcon
            icon={currentSettings.icon}
            className={classNames(hasValue && "child:fill-gray-100")}
          />
        )}
        {currentSettings.label && (
          <span
            className={classNames(
              "text-xs font-bold capitalize",
              hasValue && "text-gray-100"
            )}
          >
            {currentSettings.label}
          </span>
        )}
      </button>
    </div>
  );
}
