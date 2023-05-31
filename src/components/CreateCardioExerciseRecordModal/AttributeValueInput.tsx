import classNames from "classnames";
import React from "react";
import TextWithUnit from "../TextWithUnit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
  unit: string;
  label: string;
  value: number;
  integer?: boolean;
  selected?: boolean;
  onSelect: () => void;
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
    <div
      onClick={onSelect}
      className={classNames(
        "rounded-lg flex h-20 p-2 items-center",
        selected ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700",
        className
      )}
    >
      <div className="flex flex-col flex-1 justify-center gap-2">
        <span className={classNames("text-xs", selected && "text-gray-100")}>
          {label}
        </span>
        <TextWithUnit
          value={value}
          unit={unit}
          integer={integer}
          className={classNames("text-3xl", selected && "text-gray-100")}
          unitClassName={classNames(selected && "text-gray-100")}
        />
      </div>
      {!selected && <FontAwesomeIcon icon="pen" className="w-4 h-4 mr-2" />}
    </div>
  );
}
