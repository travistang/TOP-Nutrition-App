import NumberUtils from "../../utils/Number";

export const getMeasurementsRange = (measurementValues: (number | null)[]) => {
  if (measurementValues.length <= 1) return null;
  const [minMeasurement, maxMeasurement] = [
    NumberUtils.min(...measurementValues),
    NumberUtils.max(...measurementValues),
  ];
  const margin = (maxMeasurement - minMeasurement) / 5;
  if (margin === 0) return null;
  const res = { min: minMeasurement - margin, max: maxMeasurement + margin };
  return res;
};
