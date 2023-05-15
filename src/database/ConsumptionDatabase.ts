import {
  differenceInMinutes,
  endOfDay,
  isSameMonth,
  startOfDay,
  subDays,
} from "date-fns";
import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { Consumption } from "../types/Consumption";
import { Duration } from "../types/Duration";
import NutritionUtils from "../utils/Nutrition";
import DatabaseUtils from "../utils/Database";
import StringUtils from "../utils/String";
import { SynchronizableDatabase } from "./BaseDatabase";
import { Nutrition } from "../types/Nutrition";
import { Food } from "../types/Food";

export type ConsumptionRecord = Consumption & {
  id: string;
};

export type FoodDetails = {
  id: string;
  nutritionPerHundred: Nutrition;
  name: string;
  image?: Blob;
};

class ConsumptionDatabase extends SynchronizableDatabase<ConsumptionRecord> {
  readonly LS_LAST_SYNC_AT_KEY =
    "@nutritionApp/consumption_database_last_synced_at";

  consumptions!: Table<ConsumptionRecord>;
  foodDetails!: Table<FoodDetails>;

  constructor() {
    super("consumptionDatabase");

    this.version(2).stores({
      consumptions: "++id,name,date,version",
    });

    this.version(3).stores({
      consumptions: "++id,name,date,version",
      ...this.changeDatabaseSchema,
    });

    this.version(4).stores({
      consumptions: "++id,name,date,version",
      foodDetails: "++id,name",
      ...this.changeDatabaseSchema,
    });
  }

  get tableToSync() {
    return this.consumptions;
  }

  consumptionsOfDay(date = Date.now()) {
    return this.consumptions
      .where("date")
      .between(startOfDay(date).getTime(), endOfDay(date).getTime())
      .sortBy("date");
  }

  findRecordsWithSameFood(record: ConsumptionRecord, month?: number) {
    const sameFoodFilter = this.consumptions.filter(
      (other) =>
        NutritionUtils.isEqual(
          record.nutritionPerHundred,
          other.nutritionPerHundred
        ) && record.name === other.name
    );
    if (!month) {
      return sameFoodFilter.sortBy("date");
    }
    return sameFoodFilter
      .filter((other) => isSameMonth(month, other.date))
      .sortBy("date");
  }

  private findSimilar(
    consumption: Consumption
  ): Promise<ConsumptionRecord | undefined> {
    const filter = this.consumptions.filter((other) => {
      const diffMinutes = differenceInMinutes(consumption.date, other.date);
      const isTimeSimilar = Math.abs(diffMinutes) <= 30;
      const hasEqualNutrition = NutritionUtils.isEqual(
        consumption.nutritionPerHundred,
        other.nutritionPerHundred
      );
      return (
        other.name === consumption.name && isTimeSimilar && hasEqualNutrition
      );
    });
    return filter.first();
  }

  async updateFoodDetails(foodDetails: FoodDetails) {
    return this.foodDetails.update(foodDetails.id, foodDetails);
  }

  async getOrCreateFoodDetailByRecord(
    record: Food
  ): Promise<FoodDetails | undefined> {
    return this.transaction("rw", this.foodDetails, async (transaction) => {
      const foodDetails = await this.foodDetails
        .filter(
          (foodDetails) =>
            NutritionUtils.isEqual(
              record.nutritionPerHundred,
              foodDetails.nutritionPerHundred
            ) && record.name === foodDetails.name
        )
        .first();
      if (foodDetails) return foodDetails;
      const newFoodDetails: FoodDetails = {
        id: uuid(),
        name: record.name,
        nutritionPerHundred: record.nutritionPerHundred,
        image: undefined,
      };
      await this.foodDetails.add(newFoodDetails);
      return newFoodDetails;
    });
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
    await this.registerChange("created", newRecord);
    return this.consumptions.add(newRecord);
  }

  async edit(id: string, newRecord: ConsumptionRecord) {
    const similarRecord = await this.findSimilar(newRecord);
    if (similarRecord && similarRecord.id !== id) {
      return this.mergeRecord({ ...newRecord, id }, similarRecord);
    }
    await this.registerChange("updated", { ...newRecord, id });
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

  async remove(id: string) {
    const itemToRemove = await this.consumptions.get(id);
    if (!itemToRemove) return;
    await this.registerChange("deleted", itemToRemove);
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
