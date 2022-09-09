import React, { useContext, useEffect, useState } from 'react';
import ConsumptionDatabase, { ConsumptionRecord } from '../../database/ConsumptionDatabase';
import { baseChartSectionContext } from './BaseChartSection';

export default function useRecordsInDuration() {
  const { date, duration } = useContext(baseChartSectionContext);
  const [records, setRecords] = useState<ConsumptionRecord[]>([]);

  useEffect(() => {
    ConsumptionDatabase.recordsInRange(date, duration).then(setRecords);
  }, [date, duration]);

  return records;
}