import { isSameDay } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import MeasurementDatabase from "../database/MeasurementDatabase";
import NumberUtils from "../utils/Number";

export const WEIGHT_RECORD_NAME = "weight";

export function useCurrentBodyWeight() {
  const recentWeightRecords = useLiveQuery(() => {
    return MeasurementDatabase.measurements
      .where("name")
      .equalsIgnoreCase(WEIGHT_RECORD_NAME)
      .reverse()
      .sortBy("date");
  });
  const usingRecordsOnDay = recentWeightRecords?.[0]?.date ?? null;
  const weightsOnRecentDay = usingRecordsOnDay
    ? recentWeightRecords!
        .filter((record) => isSameDay(record.date, usingRecordsOnDay))
        .map((record) => record.value)
    : null;

  const currentWeight = weightsOnRecentDay
    ? NumberUtils.average(...weightsOnRecentDay)
    : null;
  return { currentWeight, usingRecordsOnDay };
}
