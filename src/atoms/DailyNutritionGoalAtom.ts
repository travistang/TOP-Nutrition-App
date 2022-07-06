import { atom } from "recoil";
import { NutritionCalories } from "../types/Nutrition";

export type DailyNutritionGoal = {
  targetNutritionIntake: NutritionCalories;
  targetCalories: number;
};
export const dailyNutritionGoalAtom = atom<DailyNutritionGoal>({
  key: "dailyNutritionGoal",
  default: {
    targetNutritionIntake: {
      carbohydrates: 200,
      protein: 200,
      fat: 100,
    },
    targetCalories: 3000,
  },
});
