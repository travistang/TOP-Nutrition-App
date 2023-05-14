import React, { useState } from "react";
import Calendar from "../../Calendar";
import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";
import { DayMarker } from "../../../types/Calendar";
import { format } from "date-fns";
import { DayMarkerType } from "../../../types/Calendar";
import { MarcoNutritionColor } from "../../../types/Nutrition";

const calendarMarker: DayMarker = {
  type: DayMarkerType.Highlight,
  color: MarcoNutritionColor.fat,
};
const getCalendarMarkers = (
  records: ConsumptionRecord[]
): Record<string, DayMarker> => {
  const markers: Record<string, DayMarker> = {};
  for (const record of records) {
    const dateString = format(record.date, "yyyy/MM/dd");
    markers[dateString] = calendarMarker;
  }
  return markers;
};

type Props = {
  records: ConsumptionRecord[];
};
export default function FoodConsumptionCalendar({ records }: Props) {
  const [date, setDate] = useState(Date.now());
  const markers = getCalendarMarkers(records);
  return (
    <>
      <Calendar
        date={date}
        onSelectDate={(date) => setDate(date.getTime())}
        markers={markers}
      />
    </>
  );
}
