import { format } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { createMeasurementRecordAtom } from "../atoms/CreateMeasurementAtom";
import TextInput from "../components/Input/TextInput";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import MeasurementDatabase, {
  MeasurementRecord,
} from "../database/MeasurementDatabase";
import DateUtils from "../utils/Date";

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
      <TextInput
        label=""
        type="month"
        value={format(selectedMonth, "yyyy-MM")}
        onChange={(monthString) =>
          setSelectedMonth(new Date(DateUtils.stringToDate(monthString)))
        }
      />
      {measurementsOfMonth?.map((measurement) => (
        <div
          onClick={() => onSelectMeasurement(measurement)}
          className="flex flex-row justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">{measurement.name}</span>
            <span className="text-xs opacity-70">
              {format(measurement.date, "MM-dd HH:mm")}
            </span>
          </div>
          <div className="flex items-center justify-center text-sm font-bold">
            {measurement.value.toFixed(2)}
            {measurement.unit}
          </div>
        </div>
      ))}
      {!measurementsOfMonth?.length && (
        <div className="flex items-center justify-center">
          You have no measurements this month
        </div>
      )}
    </div>
  );
}
