import classNames from "classnames";
import {
  addMonths,
  format,
  isSameMonth,
  setMonth,
  startOfYear,
} from "date-fns";
import React from "react";
import ArrayUtils from "../../../utils/Array";

type Props = {
  value: Date;
  onChange: (d: Date) => void;
};
export default function MonthListPicker({ value, onChange }: Props) {
  const yearStart = startOfYear(Date.now());

  return (
    <div className="grid grid-cols-3 gap-1">
      {ArrayUtils.range(12).map((n) => {
        const dateWithMonth = addMonths(yearStart, n);
        return (
          <button
            onClick={() => onChange(setMonth(value, n))}
            className={classNames(
              "outline-none rounded-lg flex items-center justify-center cursor-pointer",
              isSameMonth(dateWithMonth, value) && "bg-gray-700 text-gray-200"
            )}
          >
            {format(dateWithMonth, "MMM")}
          </button>
        );
      })}
    </div>
  );
}
