import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import Dexie, { Table } from "dexie";

export enum QueryTimeRange {
  Month,
  Day
};

const getTimeRange = (range: QueryTimeRange) => {
  switch (range) {
    case QueryTimeRange.Day:
      return [startOfDay, endOfDay] as const;
    case QueryTimeRange.Month:
      return [startOfMonth, endOfMonth] as const;
  }
}
export default abstract class BaseDatabase extends Dexie {

  static getRecords<T>(table: Table<T>, {
    date = Date.now(),
    dateField = 'date',
    timeRange = QueryTimeRange.Month
  }) {
    const [getStartTime, getEndTime] = getTimeRange(timeRange);
    const start = getStartTime(date);
    const end = getEndTime(date);

    return table
      .where(dateField)
      .between(start.getTime(), end.getTime())
      .sortBy(dateField);
  }

}