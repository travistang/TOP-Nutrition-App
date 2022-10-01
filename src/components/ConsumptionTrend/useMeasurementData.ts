import { useLiveQuery } from "dexie-react-hooks";
import MeasurementDatabase from "../../database/MeasurementDatabase";
import { Duration } from "../../types/Duration";
import StringUtils from '../../utils/String';

type Props = {
  date: Date | number;
  duration: Duration;
  selectedMeasurement: string;
};
export default function useMeasurementData({
  date,
  duration,
  selectedMeasurement,
}: Props) {
  const allMeasurementNames = useLiveQuery(async () => {
    return MeasurementDatabase.measurementLabels();
  });

  const measurementsOfMonth = useLiveQuery(async () => {
    return MeasurementDatabase.recordsInRange(date, duration);
  }, [date, duration]);

  const measurements =
    measurementsOfMonth?.filter(
      (measurement) => StringUtils.caseInsensitiveEqual(measurement.name, selectedMeasurement)
    ) ?? [];

  return {
    allMeasurementNames,
    measurements,
  };
}
