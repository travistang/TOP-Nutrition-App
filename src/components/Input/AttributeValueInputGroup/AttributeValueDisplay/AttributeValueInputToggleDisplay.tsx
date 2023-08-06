import AttributeValueInputToggle from "../../AttributeValueInputToggle";
import { AcceptableAttributes, InputConfig, InputWidget } from "../types";

type Props = {
  config: Extract<InputConfig, { widget: InputWidget.ToggleSelect }>;
  value: AcceptableAttributes;
  onChange?: (value: AcceptableAttributes) => void;
  selected?: boolean;
  onSelect?: () => void;
};
export default function AttributeValueInputToggleDisplay({
  selected,
  config,
  value,
  onChange,
  onSelect,
}: Props) {
  const { className = "col-span-3", options, label } = config;
  const onToggle = () => {
    if (!selected) {
      onSelect?.();
      return;
    }
    const currentIndex = options.findIndex((option) => option.value === value);
    if (currentIndex === -1 || currentIndex === options.length - 1) {
      onChange?.(options[0].value);
      return;
    }
    onChange?.(options[currentIndex + 1].value);
  };

  return (
    <AttributeValueInputToggle
      selected={selected}
      options={options}
      label={label}
      value={value}
      onToggle={onToggle}
      className={className}
    />
  );
}
