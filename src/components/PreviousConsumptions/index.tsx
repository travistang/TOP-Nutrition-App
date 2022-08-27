import { format, isSameMonth, startOfMonth } from "date-fns";
import React, { useState } from "react";
import ConsumptionSummary from "../../pages/ConsumptionSummary";
import Calendar from "../Calendar";
import TextInput from "../Input/TextInput";
import DateUtils from "../../utils/Date";

export default function PreviousConsumptions() {
  const [month, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    isSameMonth(month, Date.now()) ? new Date() : startOfMonth(month)
  );
  return (
    <div className="py-2 px-1 rounded-lg bg-gray-300 flex flex-col ">
      <span className="text-xs mb-4 px-1">Previous consumptions</span>
      <TextInput
        label=""
        type="month"
        className="col-span-4"
        inputClassName="bg-gray-400"
        value={format(month, "yyyy-MM")}
        onChange={(dateString) =>
          setSelectedMonth(new Date(DateUtils.stringToDate(dateString)))
        }
      />
      <Calendar
        date={month}
        className="bg-gray-200 rounded-lg mb-4 p-4 mt-2 gap-x-2"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <ConsumptionSummary embedded date={selectedDate} />
    </div>
  );
}
