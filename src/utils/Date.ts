import {
  differenceInMinutes,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { Duration, DurationToMonthMap } from "../types/Duration";

const toInputFormat = (date: number | Date) => {
  const inputFormat = "yyyy-MM-dd'T'HH:mm";
  return format(date, inputFormat);
};

const stringToDate = (date: string) => {
  return new Date(date).getTime();
};

const groupByTimeInterval = <T extends { date: number }>(
  items: T[],
  separateIntervalInMinutes: number
): T[][] => {
  return items
    .sort((a, b) => a.date - b.date)
    .reduce((result, item, currentIndex, arr) => {
      if (currentIndex === 0) {
        return [[item]];
      }

      const previousItem = arr[currentIndex - 1];
      const timeDiffInMinutes = differenceInMinutes(
        item.date,
        previousItem.date
      );
      return timeDiffInMinutes >= separateIntervalInMinutes
        ? [...result, [item]]
        : [
            ...result.slice(0, -1),
            [...(result[result.length - 1] ?? []), item],
          ];
    }, [] as T[][]);
};

const eachDaysOfMonth = (day: Date | number) => {
  return eachDayOfInterval({
    start: startOfMonth(day),
    end: endOfMonth(day),
  });
};

const eachDaysOfIntervalFromDuration = (
  date: Date | number,
  duration: Duration
) => {
  const end = endOfMonth(date);
  const start = subMonths(end, DurationToMonthMap[duration]);
  return eachDayOfInterval({
    start,
    end,
  });
};

const getIntervalFromDuration = (date: Date | number, duration: Duration) => {
  const endDate = endOfMonth(date);
  const startDate = subMonths(endDate, DurationToMonthMap[duration]);
  return [startDate, endDate];
};

const groupRecordsByDates = <T extends { date: Date | number }>(
  records: T[],
  dates: (Date | number)[]
): { [dateString: string]: T[] } => {
  const dateStrings = dates.map((date) => format(date, "dd/MM/yyyy"));
  const initialGroups: { [dateString: string]: T[] } = Object.assign(
    {},
    ...dateStrings.map((dateString) => ({ [dateString]: [] }))
  );
  return records.reduce((groups, record) => {
    const recordDateString = format(record.date, "dd/MM/yyyy");
    if (!groups[recordDateString]) return groups;
    return {
      ...groups,
      [recordDateString]: [...(groups[recordDateString] ?? []), record],
    };
  }, initialGroups);
};

const orderedRecordGroups = <
  T extends { date: Date | number }
>(dateRecordsMap: {
  [dateString: string]: T[];
}): T[][] => {
  return Object.entries(dateRecordsMap)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([, record]) => record);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  eachDaysOfMonth,
  toInputFormat,
  stringToDate,
  groupByTimeInterval,
  getIntervalFromDuration,
  eachDaysOfIntervalFromDuration,
  groupRecordsByDates,
  orderedRecordGroups,
};
