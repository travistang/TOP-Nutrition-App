import { differenceInMinutes, endOfDay, startOfDay, subDays } from "date-fns";
import Dexie, { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { Consumption } from "../types/Consumption";
import { Duration } from "../types/Duration";
import NutritionUtils from "../utils/Nutrition";
import DatabaseUtils from "../utils/Database";
import StringUtils from "../utils/String";
import LocalStorageUtils from "../utils/LocalStorage";
import { installSynchronizeMiddleware } from "../domain/DatabaseSynchronization/middleware";

export type ConsumptionRecord = Consumption & {
  id: string;
};

const LS_LAST_SYNC_AT_KEY = "@nutritionApp/consumption_database_last_synced_at";

class ConsumptionDatabase extends Dexie {
  consumptions!: Table<ConsumptionRecord>;

  constructor() {
    super("consumptionDatabase");
    this.version(2).stores({
      consumptions: "++id,name,date,version",
    });
  }

  get lastSyncedAt() {
    return +LocalStorageUtils.getFromStore(LS_LAST_SYNC_AT_KEY) || 0;
  }

  consumptionsOfDay(date = Date.now()) {
    return this.consumptions
      .where("date")
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy("date");
  }

  private findSimilar(
    consumption: Consumption
  ): Promise<ConsumptionRecord | undefined> {
    return this.consumptions
      .filter((other) => {
        const diffMinutes = differenceInMinutes(consumption.date, other.date);
        const isTimeSimilar = Math.abs(diffMinutes) <= 30;
        const hasEqualNutrition = NutritionUtils.isEqual(
          consumption.nutritionPerHundred,
          other.nutritionPerHundred
        );
        return (
          other.name === consumption.name && isTimeSimilar && hasEqualNutrition
        );
      })
      .first();
  }

  async mergeRecord(
    from: Consumption | ConsumptionRecord,
    to: ConsumptionRecord
  ) {
    const combinedRecord: ConsumptionRecord = {
      ...to,
      amount: from.amount + to.amount,
    };
    const editResult = await this.consumptions.update(to.id, combinedRecord);
    const fromAsRecord = from as ConsumptionRecord;
    if (fromAsRecord.id) {
      await this.remove(fromAsRecord.id);
    }
    return editResult;
  }

  async add(consumption: Consumption) {
    const similarRecord = await this.findSimilar(consumption);
    if (similarRecord) {
      return this.mergeRecord(consumption, similarRecord);
    }
    const newRecord: ConsumptionRecord = { ...consumption, id: uuid() };
    return this.consumptions.add(newRecord);
  }

  async edit(id: string, newRecord: ConsumptionRecord) {
    const similarRecord = await this.findSimilar(newRecord);
    if (similarRecord && similarRecord.id !== id) {
      return this.mergeRecord({ ...newRecord, id }, similarRecord);
    }
    return this.consumptions.update(id, newRecord);
  }

  async search(recordName: string) {
    const searchResults = await this.consumptions
      .filter((consumption) =>
        StringUtils.searchCaseInsensitive(consumption.name, recordName)
      )
      .toArray();
    return searchResults.reduce((uniqueResults, result) => {
      const hasSimilarResults = uniqueResults.find((res) =>
        NutritionUtils.isEqual(
          res.nutritionPerHundred,
          result.nutritionPerHundred
        )
      );
      return hasSimilarResults ? uniqueResults : [...uniqueResults, result];
    }, [] as ConsumptionRecord[]);
  }

  async splitMeal(
    meal: ConsumptionRecord[],
    newMealRatio: number,
    nextMealDate: number
  ) {
    if (newMealRatio === 1) {
      return Promise.all(
        meal.map((consumption) =>
          this.edit(consumption.id, { ...consumption, date: nextMealDate })
        )
      );
    }

    const newConsumptions: Consumption[] = meal.map(
      ({ id: _, ...prevRecord }) => {
        return {
          ...prevRecord,
          date: nextMealDate,
          amount: newMealRatio * prevRecord.amount,
        };
      }
    );

    const updatedOldConsumptions = meal.map((prevRecord) => ({
      ...prevRecord,
      amount: (1 - newMealRatio) * prevRecord.amount,
    }));

    await Promise.all([
      ...updatedOldConsumptions.map((updatedRecord) =>
        this.edit(updatedRecord.id, updatedRecord)
      ),
      ...newConsumptions.map((newRecord) => this.add(newRecord)),
    ]);
  }

  remove(id: string) {
    return this.consumptions.delete(id);
  }

  async recordsInRange(date: Date | number, duration: Duration) {
    return DatabaseUtils.recordsInRange(this.consumptions, date, duration);
  }

  async recordsInThisWeek() {
    const now = Date.now();
    const dayStart = startOfDay(subDays(now, 7));
    return this.consumptions
      .where("date")
      .between(dayStart.getTime(), endOfDay(now).getTime())
      .toArray();
  }
}

const consumptionDatabase = new ConsumptionDatabase();
export default consumptionDatabase;

installSynchronizeMiddleware(
  consumptionDatabase,
  "ConsumptionDatabaseSynchronizer"
);
