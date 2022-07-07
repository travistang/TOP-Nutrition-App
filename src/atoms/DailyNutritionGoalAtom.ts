import { atom, AtomEffect } from "recoil";
import { NutritionCalories } from "../types/Nutrition";

const LS_DAILY_NUTRITION_GOAL_KEY = '@nutrition_tracker/daily_nutrition_goal';
const DEFAULT_NUTRITION_GOAL = {
  modalOpened: false,
  targetNutritionIntake: {
    carbohydrates: 200,
    protein: 200,
    fat: 100,
  },
  targetCalories: 3000,
};

export type DailyNutritionGoal = {
  targetNutritionIntake: NutritionCalories;
  targetCalories: number;
  modalOpened: boolean;
};
const saveNutritionGoal: AtomEffect<DailyNutritionGoal> = ({ onSet }) => {
  onSet((newValue) => {
    localStorage.setItem(LS_DAILY_NUTRITION_GOAL_KEY, JSON.stringify(newValue));
  });
}

const getDefaultValue = (): DailyNutritionGoal => {
  try {
    return JSON.parse(localStorage.getItem(LS_DAILY_NUTRITION_GOAL_KEY) ?? '');
  } catch {
    return DEFAULT_NUTRITION_GOAL;
  }
}
export const dailyNutritionGoalAtom = atom<DailyNutritionGoal>({
  key: "dailyNutritionGoal",
  default: getDefaultValue(),
  effects: [saveNutritionGoal],
});
