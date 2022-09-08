import { atom, AtomEffect } from "recoil";
import { NutritionCalories } from "../types/Nutrition";
import { TargetCaloriesConfig, TargetCaloriesConfigType } from "../types/TargetCalories";
import LocalStorageUtils from '../utils/LocalStorage';

export const LS_DAILY_NUTRITION_GOAL_KEY = '@nutritionApp/daily_nutrition_goal';
export const DEFAULT_NUTRITION_GOAL: DailyNutritionGoal = {
  modalOpened: false,
  targetNutritionIntake: {
    carbohydrates: 200,
    protein: 200,
    fat: 100,
  },
  targetCaloriesConfig: {
    type: TargetCaloriesConfigType.Constant,
    value: 3000,
  },
};

export type DailyNutritionGoal = {
  targetNutritionIntake: NutritionCalories;
  targetCaloriesConfig: TargetCaloriesConfig;
  modalOpened: boolean;
};
export const saveNutritionGoal: AtomEffect<DailyNutritionGoal> = ({ onSet }) => {
  onSet((newValue) => {
    LocalStorageUtils.setStore(LS_DAILY_NUTRITION_GOAL_KEY, newValue);
  });
}

export const getStoredValue = (): DailyNutritionGoal => {
  return (
    LocalStorageUtils.getFromStore(LS_DAILY_NUTRITION_GOAL_KEY) ??
    DEFAULT_NUTRITION_GOAL
  );
}
export const dailyNutritionGoalAtom = atom<DailyNutritionGoal>({
  key: "dailyNutritionGoal",
  default: getStoredValue(),
  effects: [saveNutritionGoal],
});
