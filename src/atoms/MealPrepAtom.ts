import { atom } from "recoil";
import { Food } from "../types/Food";

export type MealPrep = {
  food: Food[];
  containerIds: string[];
};

export const DEFAULT_MEAL_PREP: MealPrep = {
  food: [],
  containerIds: [],
};

export type MealPrepAtomValue = {
  mealPrep: MealPrep;
  modalOpened: boolean;
};
export const mealPrepAtom = atom<MealPrepAtomValue>({
  key: "mealPrep",
  default: { mealPrep: DEFAULT_MEAL_PREP, modalOpened: false },
});
