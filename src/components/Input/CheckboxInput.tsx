import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

type Props = {
  label?: string;
  selected: boolean;
  onCheck: () => void;
  className?: string;
};
export default function CheckboxInput({
  className,
  label,
  selected,
  onCheck,
}: Props) {
  return (
    <div
      className={classNames("flex flex-row items-center", className)}
      onClick={onCheck}
    >
      <span
        className={classNames(
          "rounded-lg w-6 h-6 flex items-center justify-center",
          selected ? "bg-gray-900" : "border-2 border-gray-900 bg-transparent"
        )}
      >
        {selected && (
          <FontAwesomeIcon
            icon="check"
            className={classNames(
              "w-4 h-4",
              selected ? "child:fill-gray-50" : "child:fill-gray-900"
            )}
          />
        )}
      </span>
      <span className="text-sm pl-4">{label}</span>
    </div>
  );
}
