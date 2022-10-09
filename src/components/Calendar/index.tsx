import classNames from "classnames";
import {
  format,
  addDays,
  startOfWeek,
  startOfMonth,
  getDay,
  isSameDay,
} from "date-fns";
import React from "react";
import { DayMarker } from "../../types/Calendar";
import ArrayUtils from "../../utils/Array";
import DateUtils from "../../utils/Date";
import DayCell from "./DayCell";
import { RingConfig } from "./Ring";

type Props = {
  date: Date | number;
  selectedDate?: Date;
  markers?: Record<string, DayMarker>;
  rings?: Record<string, RingConfig>;
  onSelectDate?: (date: Date) => void;
  className?: string;
};

export default function Calendar({
  date,
  className,
  selectedDate,
  onSelectDate,
  markers,
  rings,
}: Props) {
  const now = Date.now();
  const monthStart = startOfMonth(date);
  const monthStartsAtWeekday = getDay(monthStart);
  const daysInMonth = DateUtils.eachDaysOfMonth(date);
  return (
    <div
      className={classNames(
        "grid grid-cols-7 text-center justify-evenly gap-x-5",
        className
      )}
    >
      {ArrayUtils.range(7).map((i) => (
        <span
          key={i}
          className={classNames("text-xs", i === 0 && "font-bold text-red-500")}
        >
          {format(addDays(startOfWeek(now), i), "EEEEEE")}
        </span>
      ))}
      {monthStartsAtWeekday > 0 &&
        ArrayUtils.range(monthStartsAtWeekday).map((i) => <span key={i} />)}
      {daysInMonth.map((day) => (
        <DayCell
          key={day.getTime()}
          date={day}
          onSelect={() => onSelectDate?.(day)}
          selected={selectedDate && isSameDay(selectedDate, day)}
          marker={markers?.[format(day, 'dd/MM/yyyy')]}
          ringConfig={rings?.[format(day, 'dd/MM/yyyy')]}
        />
      ))}
    </div>
  );
}
