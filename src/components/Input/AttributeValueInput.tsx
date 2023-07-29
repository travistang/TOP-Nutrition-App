import classNames from "classnames";
import TextWithUnit from "../TextWithUnit";
import AttributeValue from "./AttributeValue";

type Props = {
  className?: string;
  unit?: string;
  label: string;
  value: number;
  integer?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};
export default function AttributeValueInput({
  className,
  value,
  label,
  unit,
  integer,
  selected,
  onSelect,
}: Props) {
  return (
    <AttributeValue
      className={className}
      selected={selected}
      label={label}
      onClick={onSelect}
    >
      {value ? (
        <TextWithUnit
          value={value}
          unit={unit}
          integer={integer}
          className={classNames("text-3xl", selected && "text-gray-100")}
          unitClassName={classNames(selected && "text-gray-100")}
        />
      ) : (
        "--"
      )}
    </AttributeValue>
  );
}
