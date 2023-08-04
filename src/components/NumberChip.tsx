import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  value: number;
};

export default function NumberChip({ value, className }: Props) {
  return (
    <span
      className={classNames(
        "rounded-full px-2 bg-gray-400 text-xs font-bold text-gray-200",
        className
      )}
    >
      {value}
    </span>
  );
}
