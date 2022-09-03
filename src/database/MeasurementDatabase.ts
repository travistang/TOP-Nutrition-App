import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { Measurement } from "../types/Measurement";
import BaseDatabase, { QueryTimeRange } from "./BaseDatabase";
import ArrayUtils from "../utils/Array";
import StringUtils from "../utils/String";
import DatabaseUtils from "../utils/Database";
import { Duration } from "../types/Duration";

export type MeasurementRecord = Measurement & { id: string };

class MeasurementDatabase extends BaseDatabase<MeasurementRecord> {
  measurements!: Table<MeasurementRecord>;

  constructor() {
    super("measurementDatabase");
    this.version(2).stores({
      measurements: "++id,name,date",
    });
  }

  getMeasurementsOfMonth(date = Date.now()) {
    return this.getRecords(this.measurements, {
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

  async search(searchString: string) {
    return ArrayUtils.distinct(
      await this.measurements
        .where("name")
        .startsWithIgnoreCase(searchString)
        .toArray(),
      (a, b) => StringUtils.caseInsensitiveEqual(a.name, b.name)
    );
  }

  async isUnitMismatch(pendingRecord: Measurement) {
    const mismatchCount = await this.measurements
      .filter(
        (measurement) =>
          measurement.name === pendingRecord.name &&
          measurement.unit !== pendingRecord.unit
      )
      .count();
    return mismatchCount > 0;
  }

  async measurementLabels() {
    return Array.from(
      new Set((await this.measurements.toArray()).map((m) => m.name))
    );
  }

  async recordsInRange(date: Date | number, duration: Duration) {
    return DatabaseUtils.recordsInRange(this.measurements, date, duration);
  }

  async lastRecordOfLabel(label: string) {
    return await this.measurements.where("name").equalsIgnoreCase(label).last();
  }
}

export default new MeasurementDatabase();
