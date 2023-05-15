import React from "react";
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
  date: Date;
  records: ConsumptionRecord[];
};
export default function FoodConsumptionCalendar({ date, records }: Props) {
  const markers = getCalendarMarkers(records);
  return (
    <>
      <Calendar date={date} markers={markers} />
    </>
  );
}
