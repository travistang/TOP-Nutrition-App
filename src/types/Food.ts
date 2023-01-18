import { Consumption } from "./Consumption";

export type Food = Omit<Consumption, "date">;
export const DEFAULT_FOOD: Food = {
  nutritionPerHundred: {
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    calories: 0,
  },
  name: "",
  amount: 0,
};
