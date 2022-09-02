import { v4 as uuid } from "uuid";
import Dexie, { Table } from "dexie";
import { startOfDay } from "date-fns";
import * as TargetCaloriesDomain from '../domain/TargetCalories';
import { TargetCalories, TargetCaloriesType } from "../types/TargetCalories";

export const LS_TARGET_CALORIES_KEY = '@nutritionApp/TargetCalories';

class TargetCaloriesDatabase extends Dexie {
  targetCalories!: Table<TargetCalories>;
  constructor() {
    super("targetCaloriesDatabase");
    this.version(1).stores({
      targetCalories: "++id,date",
    });

    this.generateTargetCaloriesToday();
  }

  private async generateTargetCaloriesToday() {
    const computedTargetCalories = await TargetCaloriesDomain.computeTargetCaloriesOfDay();
    this.addTargetCalories({
      type: TargetCaloriesType.Computed,
      value: computedTargetCalories,
      date: startOfDay(Date.now()).getTime(),
    });
  }

  async addTargetCalories(targetCalories: Omit<TargetCalories, "id">) {
    const existingConfig = await this.targetCalories.where("date").equals(targetCalories.date).first();
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
    const config = await this.targetCalories.where('date').equals(date).first();
    if (config) return config;
  }

};

export default new TargetCaloriesDatabase();