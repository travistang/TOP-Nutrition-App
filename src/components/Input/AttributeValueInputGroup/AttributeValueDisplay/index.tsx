import AttributeValue from "../../AttributeValue";
import AttributeValueInput from "../../AttributeValueInput";

type Props<T extends number | string> = {
  className?: string;
  selected?: boolean;
  label: string;
  value: T;
  onSelect: () => void;
} & (T extends number
  ? {
      unit?: string;
      integer?: boolean;
    }
  : {});

export default function AttributeValueDisplay<T extends string | number>(
  props: Props<T>
) {
  if (typeof props.value === "number") {
    return <AttributeValueInput {...(props as Props<number>)} />;
  }
  const { className, selected, label, value, onSelect } = props;
  return (
    <AttributeValue
      label={label}
      selected={selected}
      onClick={onSelect}
      className={className}
    >
      {value}
    </AttributeValue>
  );
}
