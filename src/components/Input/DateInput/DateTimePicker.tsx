import classNames from "classnames";
import React from "react";
import { DateInputType } from ".";
import Calendar from "../../Calendar";
import Button from "../Button";
import MonthListPicker from "./MonthListPicker";
import ShortMonthPicker from "./ShortMonthPicker";
import TimeInputWidget from "./TimeInputWidget";
import YearPicker from "./YearPicker";

type Props = {
  mode: DateInputType;
  value: Date;
  onSelectDate: (d: Date, keepTime?: boolean) => void;
  inline?: boolean;
  className?: string;
  calendarClassName?: string;
};
export default function DateTimePicker({
  value,
  onSelectDate,
  mode,
  inline,
  className,
  calendarClassName,
}: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "flex flex-col items-stretch",
        !inline && "absolute top-full left-0 right-0 rounded-lg bg-gray-300 shadow-lg border-gray-400 border p-2 z-50",
        className
      )}
    >
      <YearPicker value={value} onChange={(d) => onSelectDate(d, true)} />
      {mode === DateInputType.Month && (
        <MonthListPicker
          value={value}
          onChange={(d) => onSelectDate(d, true)}
        />
      )}

      {mode === DateInputType.DateTime && (
        <>
          <ShortMonthPicker
            value={value}
            onChange={(d) => onSelectDate(d, true)}
          />
          <Calendar
            date={value}
            selectedDate={new Date(value)}
            onSelectDate={(d) => onSelectDate(d, true)}
            className={calendarClassName ?? 'gap-y-4'}
          />
          <div className="flex items-center justify-between mt-2 overflow-hidden">
            <TimeInputWidget
              value={value}
              onChange={(d) => onSelectDate(d, false)}
            />
            {!inline && (
                <Button
                  onClick={() => onSelectDate(new Date(), false)}
                  className="h-8 px-2"
                  text="Now"
                />
              )}
          </div>
        </>
      )}
    </div>
  );
}
