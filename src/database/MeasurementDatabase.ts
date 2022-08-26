import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { Measurement } from "../types/Measurement";
import BaseDatabase, { QueryTimeRange } from "./BaseDatabase";

export type MeasurementRecord = Measurement & { id: string };

class MeasurementDatabase extends BaseDatabase {
  measurements!: Table<MeasurementRecord>;

  constructor() {
    super("measurementDatabase");
    this.version(1).stores({
      measurements: "++id,name",
    });
  }

  getMeasurementsOfMonth(date = Date.now()) {
    return MeasurementDatabase.getRecords(this.measurements, {
      date,
      timeRange: QueryTimeRange.Month,
    });
  }

  add(measurementData: Measurement) {
    return this.measurements.add({
      ...measurementData,
      id: uuid(),
    });
  }

  edit(id: string, newData: MeasurementRecord) {
    const { id: _, ...data } = newData;
    return this.measurements.update(id, data);
  }

  remove(id: string) {
    return this.measurements.delete(id);
  }
}

export default new MeasurementDatabase();
