import classNames from "classnames";
import { format } from "date-fns";
import AttributeValue from "../../AttributeValue";

type Props = {
  className?: string;
  label: string;
  value: number | null;
  nullable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

export default function AttributeDatetimeValueDisplay({
  label,
  onSelect,
  value,
  className,
  selected,
}: Props) {
  return (
    <AttributeValue
      label={label}
      selected={selected}
      onClick={onSelect}
      className={className}
    >
      <span className={classNames(selected && "text-gray-100")}>
        {value ? format(value, "dd/MM/yyyy") : "--"}
      </span>
    </AttributeValue>
  );
}
