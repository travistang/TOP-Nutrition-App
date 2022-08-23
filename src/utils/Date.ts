import { differenceInMinutes, eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

const toInputFormat = (date: number | Date) => {
  const inputFormat = "yyyy-MM-dd'T'HH:mm";
  return format(date, inputFormat);
};

const stringToDate = (date: string) => {
  return new Date(date).getTime();
};

const groupByTimeInterval = <T extends { date: number; }>(
  items: T[],
  seperateIntervalInMinutes: number
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
      return timeDiffInMinutes >= seperateIntervalInMinutes
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  eachDaysOfMonth,
  toInputFormat,
  stringToDate,
  groupByTimeInterval,
};
