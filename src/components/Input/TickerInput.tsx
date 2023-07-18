import classNames from "classnames";
import NumberUtils from "../../utils/Number";
import TextWithUnit from "../TextWithUnit";
import Button, { ButtonStyle } from "./Button";

type TickerConfig = {
  step?: number;
  min?: number;
  max?: number;
  integer?: boolean;
};
type Props = TickerConfig & {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: string;
  className?: string;
};
const onTick = (
  currentValue: number,
  direction: "left" | "right",
  config: TickerConfig
) => {
  const { step = 1, min, max, integer } = config;
  const nextValue =
    direction === "left" ? currentValue - step : currentValue + step;
  const roundedNextValue = integer ? Math.round(nextValue) : nextValue;
  return NumberUtils.clip(min, roundedNextValue, max);
};

export default function TickerInput({
  value,
  onChange,
  step,
  min,
  max,
  integer,
  label,
  unit,
  className,
}: Props) {
  const tick = (direction: "left" | "right") => () => {
    onChange(onTick(value, direction, { step, min, max, integer }));
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-between gap-2",
        className
      )}
    >
      <Button
        type="button"
        buttonStyle={ButtonStyle.Clear}
        icon="caret-left"
        onClick={tick("left")}
      />
      <TextWithUnit
        size="xl"
        unit={unit}
        value={value}
        integer={integer}
      />
      <Button
        type="button"
        buttonStyle={ButtonStyle.Clear}
        icon="caret-right"
        onClick={tick("right")}
      />
    </div>
  );
}
