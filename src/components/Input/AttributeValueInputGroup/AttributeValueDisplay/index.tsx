import AttributeValueInput from "../../AttributeValueInput";
import { AcceptableAttributes, InputConfig, InputWidget } from "../types";
import AttributeDatetimeValueDisplay from "./AttributeDatetimeValueDisplay";
import AttributeValueInputToggleDisplay from "./AttributeValueInputToggleDisplay";

type Props = {
  config: InputConfig;
  value: AcceptableAttributes;
  onSelect?: () => void;
  onChange?: (value: AcceptableAttributes) => void;
  selected?: boolean;
};

export default function AttributeValueDisplay({
  config,
  value,
  selected,
  onChange,
  onSelect,
}: Props) {
  if (
    config.widget === InputWidget.Ticker ||
    config.widget === InputWidget.DigitPad
  ) {
    const { integer, unit, label, className = "col-span-3" } = config;
    return (
      <AttributeValueInput
        value={value as number}
        label={label}
        selected={selected}
        className={className}
        integer={integer}
        unit={unit}
        onSelect={onSelect}
      />
    );
  }

  if (config.widget === InputWidget.Datetime) {
    const { className = "col-span-3", nullable, label } = config;
    return (
      <AttributeDatetimeValueDisplay
        className={className}
        label={label}
        onSelect={onSelect}
        nullable={nullable}
        selected={selected}
        value={value as number | null}
      />
    );
  }

  if (config.widget === InputWidget.ToggleSelect) {
    return (
      <AttributeValueInputToggleDisplay
        selected={selected}
        config={config}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }
  return null;
}
