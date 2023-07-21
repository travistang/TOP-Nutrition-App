import { InputConfig, InputWidget } from "..";
import DigitInput from "../../DigitInput";
import { InputMode } from "../../DigitInput/utils/digitLogic";
import TickerInput from "../../TickerInput";

type Props = {
  className?: string;
  config: InputConfig;
  value: number;
  onChange: (value: number) => void;
};
export default function AttributeValueInputWidget({
  className,
  config,
  value,
  onChange,
}: Props) {
  const { widget } = config;
  if (widget === InputWidget.DigitPad) {
    return (
      <DigitInput
        className={className}
        inputMode={config.integer ? InputMode.Integer : undefined}
        unit={config.unit}
        defaultValue={value}
        onChange={onChange}
      />
    );
  }

  if (widget === InputWidget.Ticker) {
    return (
      <TickerInput
        value={value}
        onChange={onChange}
        className={className}
        unit={config.unit}
        integer={config.integer}
        min={config.min}
        max={config.max}
      />
    );
  }
  return null;
}
