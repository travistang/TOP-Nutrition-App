import { isSameMonth, startOfMonth } from "date-fns";
import React, { useState } from "react";
import ConsumptionSummary from "../../pages/ConsumptionSummary";
import Calendar from "../Calendar";

type Props = {
  month: Date;
};
export default function PreviousConsumptions({ month }: Props) {
  const [selectedDate, setSelectedDate] = useState(
    isSameMonth(month, Date.now()) ? new Date() : startOfMonth(month)
  );
  return (
    <div className="py-2 px-1 rounded-lg bg-gray-300 flex flex-col ">
      <span className="text-xs mb-4 px-1">Previous consumptions</span>
      <Calendar
        date={month}
        className="bg-gray-200 rounded-lg mb-4 p-4 gap-x-2"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <ConsumptionSummary embedded date={selectedDate} />
    </div>
  );
}
