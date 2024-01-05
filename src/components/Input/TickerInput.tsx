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
  formatter?: React.FC<{ value: number; unit?: string; integer?: boolean }>;
  label?: string;
  unit?: string;
  className?: string;
  buttonClassName?: string;
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
  formatter,
  integer,
  label,
  unit,
  className,
  buttonClassName,
}: Props) {
  const tick = (direction: "left" | "right") => () => {
    onChange(onTick(value, direction, { step, min, max, integer }));
  };

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {label && <span className="text-xs">{label}</span>}
      <div className="flex items-center flex-1 justify-between gap-2">
        <Button
          type="button"
          buttonStyle={ButtonStyle.Clear}
          className={buttonClassName}
          icon="caret-left"
          onClick={tick("left")}
        />
        {formatter?.({ value, unit, integer }) ?? (
          <TextWithUnit size="xl" unit={unit} value={value} integer={integer} />
        )}
        <Button
          type="button"
          buttonStyle={ButtonStyle.Clear}
          className={buttonClassName}
          icon="caret-right"
          onClick={tick("right")}
        />
      </div>
    </div>
  );
}
