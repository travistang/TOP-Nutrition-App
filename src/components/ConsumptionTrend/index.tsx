import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import DateUtils from "../../utils/Date";
import { useLiveQuery } from "dexie-react-hooks";
import BaseChartSection, { baseChartSectionContext } from "../BaseChartSection";
import useChartConfig from "./useChartConfig";
import SelectInput from "../Input/SelectInput";
import useMeasurementData from "./useMeasurementData";

function ConsumptionTrendInner() {
  const { date, duration } = useContext(baseChartSectionContext);
  const eachDaysInDuration = DateUtils.eachDaysOfIntervalFromDuration(
    date,
    duration
  );
  const recordsInDuration = useLiveQuery(async () => {
    return ConsumptionDatabase.recordsInRange(date, duration);
  }, [date, duration]);
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>("");
  const { measurements, allMeasurementNames } = useMeasurementData({
    date,
    duration,
    selectedMeasurement,
  });

  const { data, options } = useChartConfig({
    records: recordsInDuration ?? [],
    eachDaysInDuration,
    measurements,
  });

  useEffect(() => {
    if (allMeasurementNames?.length) {
      setSelectedMeasurement(allMeasurementNames[0]);
    }
  }, [allMeasurementNames]);

  return (
    <>
      <SelectInput
        label=""
        value={selectedMeasurement}
        onSelect={setSelectedMeasurement}
        inputClassName="bg-gray-400"
        options={(allMeasurementNames ?? []).map((name) => ({
          label: name,
          value: name,
        }))}
      />
      <Chart type="bar" data={data} options={options} />
    </>
  );
}

export default function ConsumptionTrend() {
  return (
    <BaseChartSection label="Calories consumption - nutrition trend">
      <ConsumptionTrendInner />
    </BaseChartSection>
  );
}
