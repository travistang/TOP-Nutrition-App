import React from "react";
import FoodConsumptionCalendar from "./FoodConsumptionCalendar";
import Section from "../../Section";
import DateInput from "../../Input/DateInput";
import { DateInputType } from "../../Input/DateInput/types";
import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";

type Props = {
  date: Date;
  onChangeDate: (date: Date) => void;
  records: ConsumptionRecord[];
};
export default function FoodConsumptionHistory({
  records,
  date,
  onChangeDate,
}: Props) {
  return (
    <Section label="Consumption history" className="gap-2">
      <DateInput
        dateType={DateInputType.Month}
        value={date}
        onChange={onChangeDate}
      />
      <FoodConsumptionCalendar date={date} records={records} />
    </Section>
  );
}
