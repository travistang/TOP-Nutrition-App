import { Nutrition } from "./Nutrition";

export type Consumption = {
  nutritionPerHundred: Nutrition;
  name: string;
  amount: number;
  date: number;
};

export const DEFAULT_CONSUMPTION: Consumption = {
  nutritionPerHundred: {
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    calories: 0,
  },
  name: "",
  date: Date.now(),
  amount: 0,
};