import classNames from "classnames";
import React, { forwardRef } from "react";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  onShiftFocus: () => void;
  max: number;
  shiftFocusThreshold: number;
};
const TimeInput = forwardRef<HTMLInputElement | null, Props>((props, ref) => {
  const { value, onChange, shiftFocusThreshold, onShiftFocus, max } = props;
  const changeWithGuard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    if (newValue > max || Number.isNaN(newValue)) return;

    onChange(newValue);
    if (newValue >= shiftFocusThreshold) onShiftFocus?.();
  };
  return (
    <input
      ref={ref}
      type="number"
      min={0}
      max={max}
      value={value}
      onFocus={(e) => e.target.select()}
      onChange={changeWithGuard}
      pattern="[0-9]{2}"
      className={classNames(
        "outline-none rounded-lg border-2 border-gray-700 text-lg px-2 cursor-pointer w-12",
        "focus:bg-gray-700 focus:text-gray-200 text-gray-700 bg-gray-300"
      )}
    />
  );
});

export default TimeInput;
