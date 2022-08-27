import { Measurement } from "../types/Measurement";

const average = (measurements: Measurement[]): Measurement | null => {
  if (!measurements.length) return null;
  const sumMeasurement = measurements.reduce((sum, measurement) => ({
    ...sum,
    value: sum.value + measurement.value,
  }));
  return {
    ...sumMeasurement,
    value: sumMeasurement.value / measurements.length,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  average,
};
