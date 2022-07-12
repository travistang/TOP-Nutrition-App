import classNames from "classnames";
import { format } from "date-fns";
import React from "react";

type Props = {
  date: Date;
  selected?: boolean;
  onSelect: () => void;
};

export default function DayCell({ date, selected, onSelect }: Props) {
  return (
    <span
      className={classNames(
        "rounded-full aspect-square flex items-center justify-center text-sm",
        selected ? "bg-blue-400 text-gray-100" : "text-gray-600"
      )}
      key={date.getTime()}
      onClick={onSelect}
    >
      {format(date, "d")}
    </span>
  );
}
