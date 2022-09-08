import { v4 as uuid } from "uuid";
import Dexie, { Table } from "dexie";
import { endOfDay, startOfDay } from "date-fns";
import * as TargetCaloriesDomain from "../domain/TargetCalories";
import { TargetCalories, TargetCaloriesType } from "../types/TargetCalories";

export const LS_TARGET_CALORIES_KEY = "@nutritionApp/TargetCalories";

class TargetCaloriesDatabase extends Dexie {
  targetCalories!: Table<TargetCalories>;
  constructor() {
    super("targetCaloriesDatabase");
    this.version(2).stores({
      targetCalories: "++id,date,type",
    });

    this.generateTargetCaloriesToday();
  }

  private async generateTargetCaloriesToday() {
    const computedTargetCalories =
      await TargetCaloriesDomain.computeTargetCaloriesOfDay();
    this.addTargetCalories({
      type: TargetCaloriesType.Computed,
      value: computedTargetCalories,
      date: startOfDay(Date.now()).getTime(),
    });
  }

  async editTargetCalories(id: string, targetCalories: Pick<TargetCalories, "type" | "value">) {
    const { type, value } = targetCalories;
    this.targetCalories.update(id, {
      type, value,
    });
  }

  async addTargetCalories(targetCalories: Omit<TargetCalories, "id">) {
    const existingConfig = await this.targetCalories
      .where("date")
      .equals(targetCalories.date)
      .first();
    if (!existingConfig) {
      this.targetCalories.add({
        ...targetCalories,
        id: uuid(),
      });
      return;
    }

    this.targetCalories.update(existingConfig.id, targetCalories);
  }

  async targetCaloriesOfDay(date = Date.now()) {
    const config = await this.targetCalories.where("date").equals(date).first();
    if (config) return config;
    return {
      id: "",
      date: startOfDay(date).getTime(),
      value: TargetCaloriesDomain.DEFAULT_TARGET_CALORIES,
      type: TargetCaloriesType.Computed,
    } as TargetCalories;
  }

  async getTargetCaloriesInRange(
    startDate: Date | number,
    endDate: Date | number
  ) {
    const start = startOfDay(startDate);
    const end = endOfDay(endDate);
    return this.targetCalories
      .where("date")
      .between(start.getTime(), end.getTime())
      .toArray();
  }
}

export default new TargetCaloriesDatabase();
