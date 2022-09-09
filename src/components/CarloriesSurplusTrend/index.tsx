import {  max, min } from 'date-fns';
import React, { useContext } from 'react';
import { Chart } from 'react-chartjs-2';
import { useLiveQuery } from 'dexie-react-hooks';
import BaseChartSection, { baseChartSectionContext } from '../ConsumptionTrend/BaseChartSection';
import DateUtils from "../../utils/Date";
import ConsumptionDatabase from '../../database/ConsumptionDatabase';
import { useTargetCalories } from '../../domain/TargetCalories';
import useChartConfig from './useChartConfig';

function CaloriesSurplusTrendInner() {
  const { date, duration } = useContext(baseChartSectionContext);
  const eachDaysInDuration = DateUtils.eachDaysOfIntervalFromDuration(
    date, duration
  );
  const targetCalories = useTargetCalories(min(eachDaysInDuration), max(eachDaysInDuration));
  const recordsInDuration = useLiveQuery(async () => {
    return ConsumptionDatabase.recordsInRange(date, duration);
  }, [date, duration]);

  const data = useChartConfig(targetCalories, recordsInDuration, eachDaysInDuration);

  return (
    <Chart type="bar" data={data} options={{
      plugins: { tooltip: { enabled: false }, legend: { display: false } },
    }} />
  );
}

export default function ConsumptionTrend() {
  return (
    <BaseChartSection label="Calories surplus / deficit trend">
      <CaloriesSurplusTrendInner />
    </BaseChartSection>
  );
}