import { endOfDay, startOfDay } from 'date-fns';
import Dexie, { Table } from 'dexie';
import { v4 as uuid } from 'uuid';
import { Consumption } from '../types/Consumption';

export type ConsumptionRecord = Consumption & {
  id: string;
};

class ConsumptionDatabase extends Dexie {
  consumptions!: Table<ConsumptionRecord>;

  constructor() {
    super("consumptionDatabase");
    this.version(2).stores({
      consumptions: "++id,name,date",
    });
  }

  consumptionsOfDay(date = Date.now()) {
    return this.consumptions.where('date').between(startOfDay(date).getTime(), endOfDay(date).getTime()).toArray();
  }

  add(consumption: Consumption) {
    const record: ConsumptionRecord = { ...consumption, id: uuid() };
    return this.consumptions.add(record);
  }

  edit(id: string, newRecord: ConsumptionRecord) {
    const { id: _, ...data } = newRecord;
    return this.consumptions.update(id, data);
  }

  search(recordName: string) {
    return this.consumptions.where('name').startsWithIgnoreCase(recordName).toArray();
  }

  remove(id: string) {
    return this.consumptions.delete(id);
  }
}

export default new ConsumptionDatabase();