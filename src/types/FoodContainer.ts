import { Food } from "./Food";

export type FoodContainer = {
  name: string;
  identifier: string;
  content: Food[];
};

export const DEFAULT_FOOD_CONTAINER: FoodContainer = {
  name: '',
  identifier: '',
  content: [],
};