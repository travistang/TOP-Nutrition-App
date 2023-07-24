import { DateInputType } from "../../DateInput";
import DateTimePicker from "../../DateInput/DateTimePicker";
import DigitInput from "../../DigitInput";
import { InputMode } from "../../DigitInput/utils/digitLogic";
import TickerInput from "../../TickerInput";
import { AcceptableAttributes, InputConfig, InputWidget } from "../types";

type Props = {
  className?: string;
  config: InputConfig;
  value: AcceptableAttributes;
  onChange: (value: AcceptableAttributes) => void;
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
        defaultValue={value as number}
        onChange={onChange}
      />
    );
  }

  if (widget === InputWidget.Ticker) {
    return (
      <TickerInput
        value={value as number}
        onChange={onChange}
        className={className}
        unit={config.unit}
        integer={config.integer}
        min={config.min}
        max={config.max}
      />
    );
  }

  if (widget === InputWidget.Datetime) {
    const onClear = config.nullable ? () => onChange(null) : undefined;
    return (
      <DateTimePicker
        withNowButton
        onClear={onClear}
        mode={DateInputType.Date}
        className={className}
        value={value ? new Date(value) : new Date()}
        onSelectDate={(date) => onChange(date.getTime())}
      />
    );
  }
  return null;
}
