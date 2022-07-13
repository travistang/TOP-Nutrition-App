import classNames from "classnames";
import {
  endOfMonth,
  format,
  addDays,
  startOfWeek,
  startOfMonth,
  getDay,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import React from "react";
import ArrayUtils from "../../utils/Array";
import DayCell from "./DayCell";

type Props = {
  date: Date | number;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
};

export default function Calendar({
  date,
  className,
  selectedDate,
  onSelectDate,
}: Props) {
  const now = Date.now();
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const monthStartsAtWeekday = getDay(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
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
        ArrayUtils.range(monthStartsAtWeekday).map((_) => <span />)}
      {daysInMonth.map((day) => (
        <DayCell
          date={day}
          onSelect={() => onSelectDate(day)}
          selected={selectedDate && isSameDay(selectedDate, day)}
        />
      ))}
    </div>
  );
}
