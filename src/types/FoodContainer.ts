import { Food } from "./Food";

export type FoodContainer = {
  name: string;
  identifier: string;
  content: Food[];
  preparationDate?: number;
};

export const DEFAULT_FOOD_CONTAINER: FoodContainer = {
  name: '',
  identifier: '',
  content: [],
};