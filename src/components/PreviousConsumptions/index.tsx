import { isSameMonth, startOfMonth } from "date-fns";
import React, { useState } from "react";
import ConsumptionSummary from "../../pages/ConsumptionSummary";
import { MarcoNutritionColor } from "../../types/Nutrition";
import Calendar from "../Calendar";
import DateInput, { DateInputType } from "../Input/DateInput";
import useRingConfig from "./useRingConfig";

export default function PreviousConsumptions() {
  const [month, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    isSameMonth(month, Date.now()) ? new Date() : startOfMonth(month)
  );

  const ringConfigs = useRingConfig(month);
  return (
    <div className="py-2 px-1 rounded-lg bg-gray-300 flex flex-col ">
      <span className="text-xs mb-4 px-1">Previous consumptions</span>
      <DateInput
        label=""
        dateType={DateInputType.Month}
        className="col-span-4"
        inputClassName="bg-gray-400"
        value={month}
        onChange={setSelectedMonth}
      />
      <Calendar
        date={month}
        rings={ringConfigs}
        className="bg-gray-200 rounded-lg mb-4 p-4 mt-2 gap-x-2"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <ConsumptionSummary embedded date={selectedDate} />
    </div>
  );
}
