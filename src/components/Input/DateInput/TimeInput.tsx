import classNames from "classnames";
import React, { forwardRef, useCallback } from "react";
import Button, { ButtonStyle } from "../Button";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  max: number;
};
const TimeInput = forwardRef<HTMLInputElement | null, Props>((props, ref) => {
  const { value, onChange, max } = props;
  const changeWithGuard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    if (newValue > max || Number.isNaN(newValue)) return;

    onChange(newValue);
  };

  const onTick = useCallback(
    (diff: 1 | -1) => () => {
      const nextValue = value + diff;
      if (nextValue < 0) return onChange(max);
      if (nextValue > max) return onChange(0);
      onChange(nextValue);
    },
    [value, onChange, max]
  );

  return (
    <div className="flex flex-col gap-1 items-stretch flex-1">
      <Button
        buttonStyle={ButtonStyle.Clear}
        icon="caret-up"
        onClick={onTick(1)}
      />
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
          "outline-none rounded-lg border-2 border-gray-700 text-3xl text-center h-16",
          "focus:bg-gray-700 focus:text-gray-200 text-gray-700 bg-gray-300"
        )}
      />
      <Button
        buttonStyle={ButtonStyle.Clear}
        icon="caret-down"
        onClick={onTick(-1)}
      />
    </div>
  );
});

export default TimeInput;
