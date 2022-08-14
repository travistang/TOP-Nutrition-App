import React from "react";
import classNames from "classnames";
import NumberInput from "../Input/NumberInput";

type Props = {
  label: string;
  value: number;
  secondValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  unit?: string;
};
export default function ItemRow({
  label,
  value,
  secondValue,
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
      <span className="font-bold text-gray-100 capitalize col-span-3 text-ellipsis overflow-hidden text-sm">
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
          {secondValue !== undefined && (
            <span className="text-right text-gray-100 text-xs">
              {secondValue.toFixed(1)}
            </span>
          )}
          <span className="text-sm font-bold ml-2 text-gray-100 flex-1 justify-self-end text-ellipsis overflow-hidden">
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
