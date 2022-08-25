import { Table } from "dexie";
import { Measurement } from "../types/Measurement";
import BaseDatabase, { QueryTimeRange } from "./BaseDatabase";

type MeasurementRecord = Measurement & { id: string; };

class MeasurementDatabase extends BaseDatabase {
  measurements!: Table<MeasurementRecord>;

  constructor() {
    super("measurementDatabase");
    this.version(1).stores({
      measurements: "++id,name"
    })
  }

  getMeasurementsOfMonth(date = Date.now()) {
    return MeasurementDatabase.getRecords(this.measurements, {
      date,
      timeRange: QueryTimeRange.Month,
    });
  }
 };

export default new MeasurementDatabase();