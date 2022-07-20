import { Meal } from "../types/Meal";
import NutritionUtils from './Nutrition';

const totalNutrition = (meal: Meal) => {
  return NutritionUtils.total(...meal.map(NutritionUtils.nutritionFromConsumption));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  totalNutrition,
};
