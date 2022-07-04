import { MarcoNutrition, MarcoNutritionCalories, Nutrition } from "../types/Nutrition";

const totalCalories = (nutrition: Nutrition) => Object.values(MarcoNutrition).reduce((sum, marco) => sum + MarcoNutritionCalories[marco] * nutrition[marco], 0);
const caloriesByAmount = (nutrition: Nutrition, amountInGrams: number) => {
  return nutrition.calories * amountInGrams / 100;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  totalCalories,
  caloriesByAmount,
};