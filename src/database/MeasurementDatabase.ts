import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { Measurement } from "../types/Measurement";
import BaseDatabase, { QueryTimeRange } from "./BaseDatabase";
import ArrayUtils from '../utils/Array';
import StringUtils from '../utils/String';

export type MeasurementRecord = Measurement & { id: string };

class MeasurementDatabase extends BaseDatabase<Measurement> {
  measurements!: Table<MeasurementRecord>;

  constructor() {
    super("measurementDatabase");
    this.version(1).stores({
      measurements: "++id,name",
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
      await (this.measurements.where('name').startsWithIgnoreCase(searchString).toArray()),
      (a, b) => StringUtils.caseInsensitiveEqual(a.name, b.name),
    );
  }
}

export default new MeasurementDatabase();
