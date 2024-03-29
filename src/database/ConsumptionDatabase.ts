import {
  differenceInMinutes,
  endOfDay,
  isSameMonth,
  startOfDay,
  subDays,
} from "date-fns";
import { Table } from "dexie";
import { v4 as uuid } from "uuid";
import { subtractAmount } from "../domain/FoodAmountTracking";
import {
  hasExpiredContainers,
  shouldRestock,
} from "../domain/FoodAmountTracking/containers";
import { Consumption } from "../types/Consumption";
import { Duration } from "../types/Duration";
import { Food } from "../types/Food";
import { FoodAmountTracking } from "../types/FoodAmountTracking";
import { Nutrition } from "../types/Nutrition";
import DatabaseUtils from "../utils/Database";
import NutritionUtils from "../utils/Nutrition";
import StringUtils from "../utils/String";
import { SynchronizableDatabase } from "./BaseDatabase";
export type ConsumptionRecord = Consumption & {
  id: string;
};

export type FoodDetails = {
  id: string;
  nutritionPerHundred: Nutrition;
  name: string;
  image?: Blob;
  amountTracking?: FoodAmountTracking;
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

  findRecordsByDetails(details: FoodDetails, month?: number) {
    const sameFoodFilter = this.consumptions.filter(
      (other) =>
        NutritionUtils.isEqual(
          details.nutritionPerHundred,
          other.nutritionPerHundred
        ) && details.name === other.name
    );
    if (!month) {
      return sameFoodFilter.sortBy("date");
    }
    return sameFoodFilter
      .filter((other) => isSameMonth(month, other.date))
      .sortBy("date");
  }

  async foodsRequiringRestock() {
    return this.foodDetails
      .filter((detail) => {
        if (!detail.amountTracking) return false;
        return shouldRestock(detail.amountTracking);
      })
      .toArray();
  }

  async foodWithExpiredContainers() {
    return this.foodDetails
      .filter(
        (detail) =>
          !!detail.amountTracking && hasExpiredContainers(detail.amountTracking)
      )
      .toArray();
  }
  async foodStockSummary() {
    const restockingFood = await this.foodsRequiringRestock();
    const foodWithExpiredContainers = await this.foodWithExpiredContainers();

    return {
      restock: restockingFood,
      expired: foodWithExpiredContainers,
    };
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

  async updateFoodDetails(
    id: string,
    foodDetails: Partial<Omit<FoodDetails, "id">>
  ) {
    return this.foodDetails.update(id, foodDetails);
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
    const foodDetails = await this.getOrCreateFoodDetailByRecord(consumption);
    if (foodDetails?.amountTracking) {
      const newTrackingData = subtractAmount(
        foodDetails.amountTracking,
        consumption.amount,
        consumption.date
      );
      await this.updateFoodDetails(foodDetails.id, {
        amountTracking: newTrackingData,
      });
    }

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

  async searchFoodDetails(searchString: string) {
    return this.foodDetails
      .filter((details) =>
        StringUtils.searchCaseInsensitive(details.name, searchString)
      )
      .toArray();
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
