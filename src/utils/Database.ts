import { Table } from "dexie";
import DateUtils from "./Date";
import { Duration } from "../types/Duration";

const recordsInRange = async <T extends { date: number }>(
  table: Table<T>,
  date: Date | number,
  duration: Duration
) => {
  const [start, end] = DateUtils.getIntervalFromDuration(date, duration);
  return table
    .where("date")
    .between(start.getTime(), end.getTime())
    .sortBy("date");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  recordsInRange,
};
