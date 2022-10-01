import { getMeasurementsRange } from "../utils";
import DateUtils from "../../../utils/Date";
import { Measurement } from "../../../types/Measurement";
import MeasurementUtils from "../../../utils/Measurement";
import getChartOptions from "../chartOptions";

const createMeasurementChartData = (
  measurements: Measurement[],
  eachDaysInDuration: Date[]
) => {
  const measurementsGroupedByDay = DateUtils.groupRecordsByDates(
    measurements,
    eachDaysInDuration
  );
  const measurementsByDay = DateUtils.orderedRecordGroups(
    measurementsGroupedByDay
  );
  const averageMeasurementsByDay = measurementsByDay
    .map(MeasurementUtils.average)
    .map((avg) => avg?.value ?? null);

  const measurementAxisRange = getMeasurementsRange(averageMeasurementsByDay);
  const chartOptions = getChartOptions(
    measurementAxisRange,
    !!measurements.length ? measurements[0] : undefined
  );
  return [
    {
      label: "Measurements",
      type: "line" as const,
      yAxisID: "measurements",
      data: averageMeasurementsByDay,
      backgroundColor: "rgb(100, 0, 255)",
      borderColor: "rgb(100, 0, 255)",
    },
    chartOptions,
  ] as const;
};

export default createMeasurementChartData;