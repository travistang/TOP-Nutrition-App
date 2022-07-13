import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { format, eachDayOfInterval, parse, startOfMonth } from "date-fns";

import ConsumptionDatabase from "../database/ConsumptionDatabase";

import ConsumptionTrend from "../components/ConsumptionTrend";
import MealDistributionTrend from "../components/MealDistributionTrend";
import PreviousConsumptions from "../components/PreviousConsumptions";
import TextInput from "../components/Input/TextInput";
import { endOfMonth } from "date-fns/esm";

export default function PreviousStatistics() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const previousRecords = useLiveQuery(async () => {
    const datesOfMonth = eachDayOfInterval({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    });
    const recordsOfEachDay = await Promise.all(
      datesOfMonth.map(
        async (date) =>
          [
            date.getTime(),
            await ConsumptionDatabase.consumptionsOfDay(date.getTime()),
          ] as const
      )
    );

    return recordsOfEachDay.sort((a, b) => a[0] - b[0]);
  }, [selectedMonth]);

  return (
    <div className="flex flex-col overflow-y-auto flex-1 items-stretch gap-2 pb-12">
      <TextInput
        label=""
        type="month"
        value={format(selectedMonth, "yyyy-MM")}
        onChange={(monthString) =>
          setSelectedMonth(parse(monthString, "yyyy-MM", Date.now()))
        }
      />
      <ConsumptionTrend previousRecords={previousRecords ?? []} />
      <MealDistributionTrend previousRecords={previousRecords ?? []} />
      <PreviousConsumptions month={selectedMonth} />
    </div>
  );
}
