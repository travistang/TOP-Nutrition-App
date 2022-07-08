import { endOfDay, startOfDay } from 'date-fns';
import Dexie, { Table } from 'dexie';
import { v4 as uuid } from 'uuid';
import { Consumption } from '../types/Consumption';
import NutritionUtils from '../utils/Nutrition';

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
    return this.consumptions
      .where('date')
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy('date');
  }

  add(consumption: Consumption) {
    const record: ConsumptionRecord = { ...consumption, id: uuid() };
    return this.consumptions.add(record);
  }

  edit(id: string, newRecord: ConsumptionRecord) {
    const { id: _, ...data } = newRecord;
    return this.consumptions.update(id, data);
  }

  async search(recordName: string) {
    const searchResults = await this.consumptions.where('name').startsWithIgnoreCase(recordName).toArray();
    return searchResults.reduce((uniqueResults, result) => {
      const hasSimilarResults = uniqueResults.find(res => NutritionUtils.isEqual(res.nutritionPerHundred, result.nutritionPerHundred));
      return hasSimilarResults ? uniqueResults : [...uniqueResults, result];
    }, [] as ConsumptionRecord[]);
  }

  remove(id: string) {
    return this.consumptions.delete(id);
  }
}

export default new ConsumptionDatabase();