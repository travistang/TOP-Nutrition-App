
import { useLiveQuery } from "dexie-react-hooks";
import React, { useContext } from "react";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import BaseChartSection, { baseChartSectionContext } from "../ConsumptionTrend/BaseChartSection";
import DateUtils from "../../utils/Date";
import TimetableChart from "./TimetableChart";

function MealDistributionTrendInner() {
  const { date, duration } = useContext(baseChartSectionContext);
  const [durationStart, durationEnd] = DateUtils.getIntervalFromDuration(date, duration);
  const allRecords = useLiveQuery(
    () => ConsumptionDatabase.recordsInRange(date, duration),
    [date, duration]
  );

  return (
    <TimetableChart
      className="border rounded-lg border-gray-400 my-2"
      data={allRecords ?? []}
      startDate={durationStart}
      endDate={durationEnd}
    />
  );
}

export default function MealDistributionTrend() {
  return (
    <BaseChartSection label="Meal time distribution">
      <MealDistributionTrendInner />
    </BaseChartSection>
  );
}
