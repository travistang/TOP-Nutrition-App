import classNames from "classnames";
import React from "react";
import NumberInput from "../Input/NumberInput";
import TextInput from "../Input/TextInput";

type Props = {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  unit?: string;
};
export default function ItemRow({
  label,
  value,
  onChange,
  className,
  unit,
}: Props) {
  const editable = !!onChange;

  return (
    <div
      className={classNames(
        "py-1 grid grid-cols-6 items-center border-gray-100 overflow-hidden col-span-full",
        className
      )}
    >
      <span className="font-bold text-gray-100 capitalize col-span-4 text-ellipsis">
        {label}
      </span>
      {editable ? (
        <>
          <NumberInput
            label=""
            value={value}
            onChange={onChange}
            className="col-span-1"
          />
          <span className="text-sm font-bold ml-2 text-gray-100 flex-1 justify-self-end">
            {unit}
          </span>
        </>
      ) : (
        <span className="font-bold text-gray-100">
          {value.toFixed(1)}
          {unit}
        </span>
      )}
    </div>
  );
}
