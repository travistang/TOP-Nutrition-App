import classNames from "classnames";
import React from "react";
import { DateInputType } from ".";
import Calendar from "../../Calendar";
import Button, { ButtonStyle } from "../Button";
import MonthListPicker from "./MonthListPicker";
import ShortMonthPicker from "./ShortMonthPicker";
import TimeInputWidget from "./TimeInputWidget";
import YearPicker from "./YearPicker";

type Props = {
  mode: DateInputType;
  value: Date;
  onSelectDate: (d: Date, keepTime?: boolean) => void;
  withNowButton?: boolean;
  className?: string;
  calendarClassName?: string;
};
export default function DateTimePicker({
  value,
  onSelectDate,
  mode,
  className,
  withNowButton,
  calendarClassName,
}: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "flex flex-col items-stretch gap-2 w-full flex-1",
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
            className={calendarClassName ?? "gap-y-4"}
          />
          <div className="flex items-center justify-between mt-2 overflow-hidden">
            <TimeInputWidget
              value={value}
              onChange={(d) => onSelectDate(d, false)}
            />
          </div>
          {withNowButton && (
            <Button
              buttonStyle={ButtonStyle.Clear}
              onClick={() => onSelectDate(new Date(), false)}
              icon="clock"
              className="h-10 px-2 w-max"
              text="Set to now"
            />
          )}
        </>
      )}
    </div>
  );
}
