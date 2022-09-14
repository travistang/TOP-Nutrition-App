import NumberUtils from "../../utils/Number";
import ArrayUtils from "../../utils/Array";
import { startOfDay } from "date-fns";

export const groupDataWithinDay = <T extends { date: Date | number }>(
  data: T[],
  intervalInMinutes = 30
): boolean[] => {
  const numIntervals = NumberUtils.safeDivide(60 * 24, intervalInMinutes) || 1;
  if (!data.length) {
    return ArrayUtils.range(numIntervals).map((_) => false);
  }
  const dateStart = startOfDay(data[0].date).getTime();
  const allDataTimestamps = data.map(({ date }) => new Date(date).getTime());
  const intervalInMs = intervalInMinutes * 60 * 1000;
  return ArrayUtils.range(numIntervals).map<boolean>((intervalIndex) => {
    const startIntervalTimestamp = dateStart + intervalInMs * intervalIndex;
    const nextIntervalTimestamp = startIntervalTimestamp + intervalInMs;
    return allDataTimestamps.some(
      (ts) => startIntervalTimestamp <= ts && ts < nextIntervalTimestamp
    );
  });
};
