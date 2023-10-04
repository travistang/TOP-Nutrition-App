import classNames from "classnames";
import { createPortal } from "react-dom";
import TextWithUnit from "../../TextWithUnit";
import AttributeValue from "../AttributeValue";
import DigitInput from "../DigitInput";
import { InputMode } from "../DigitInput/utils/digitLogic";

type Props = {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  label: string;
  selected?: boolean;
  onSelect: () => void;
  unit?: string;
  integer?: boolean;
  keypadContainerId: string;
};
export default function SplitDigitInput({
  value,
  label,
  selected,
  keypadContainerId,
  onSelect,
  onChange,
  unit,
  integer,
  className,
}: Props) {
  const keypadContainerElement = document.getElementById(keypadContainerId);

  return (
    <>
      <AttributeValue
        label={label}
        selected={selected}
        onClick={onSelect}
        className={className}
      >
        <TextWithUnit
          className={classNames(selected && "text-white")}
          unitClassName={classNames(selected && "text-white")}
          integer={integer}
          unit={unit}
          value={value}
        />
      </AttributeValue>
      {selected &&
        keypadContainerElement &&
        createPortal(
          <DigitInput
            inputMode={integer ? InputMode.Integer : undefined}
            defaultValue={value}
            onChange={onChange}
            unit={unit}
          />,
          keypadContainerElement
        )}
    </>
  );
}
