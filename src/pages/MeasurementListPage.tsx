import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../atoms/CreateMeasurementAtom";
import DateInput, { DateInputType } from "../components/Input/DateInput";
import MeasurementRecordItem from "../components/MeasurementRecord";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../database/MeasurementDatabase";

export default function MeasurementListPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const setMeasurementAtom = useSetRecoilState(createMeasurementRecordAtom);
  const measurementsOfMonth = useLiveQuery(() => {
    return MeasurementDatabase.getMeasurementsOfMonth(selectedMonth.getTime());
  }, [selectedMonth]);

  const onSelectMeasurement = (measurement: MeasurementRecord) => {
    setMeasurementAtom({ record: measurement, modalOpened: true });
  };
  return (
    <div className="flex flex-col overflow-y-auto flex-1 items-stretch gap-2 pb-24">
      <StatisticsNavigateTab />
      <DateInput
        dateType={DateInputType.Month}
        value={selectedMonth}
        onChange={setSelectedMonth}
      />
      {measurementsOfMonth?.map((measurement) => (
        <MeasurementRecordItem
          measurement={measurement}
          key={measurement.id}
          onSelect={() => onSelectMeasurement(measurement)}
        />
      ))}
      {!measurementsOfMonth?.length && (
        <div className="flex items-center justify-center text-xs h-full">
          You have no measurements this month
        </div>
      )}
    </div>
  );
}
