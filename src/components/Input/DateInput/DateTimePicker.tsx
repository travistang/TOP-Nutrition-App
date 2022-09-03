import React from "react";
import { DateInputType } from ".";
import Calendar from "../../Calendar";
import Button from "../Button";
import MonthListPicker from "./MonthListPicker";
import ShortMonthPicker from "./ShortMonthPicker";
import TimeInputWidget from "./TimeInputWidget";
import YearPicker from "./YearPicker";

type Props = {
  showingDate: Date;
  mode: DateInputType;
  value: Date;
  onSelectDate: (d: Date, keepTime?: boolean) => void;
};
export default function DateTimePicker({
  showingDate,
  value,
  onSelectDate,
  mode,
}: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 right-0 rounded-lg bg-gray-300 shadow-lg border-gray-400 border p-2 z-50 flex flex-col items-stretch"
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
            className="gap-y-4"
          />
          <div className="flex items-center justify-between mt-2 overflow-hidden">
            <TimeInputWidget
              value={value}
              onChange={(d) => onSelectDate(d, false)}
            />
            <Button
              onClick={() => onSelectDate(new Date(), false)}
              className="h-8 px-2"
              text="Now"
            />
          </div>
        </>
      )}
    </div>
  );
}
