import NumberUtils from './Number';
import { MarcoNutrition, MarcoNutritionCalories, Nutrition, NutritionCalories } from "../types/Nutrition";
import { Consumption, DEFAULT_CONSUMPTION } from '../types/Consumption';

const totalCalories = (nutrition: Nutrition) => Object.values(MarcoNutrition).reduce((sum, marco) => sum + MarcoNutritionCalories[marco] * nutrition[marco], 0);
const caloriesByAmount = (nutrition: Nutrition, amountInGrams: number) => {
  return NumberUtils.nanToZero(nutrition.calories * amountInGrams / 100);
}

const marcoNutritionByAmount = (marco: MarcoNutrition, nutrition: Nutrition, amountInGrams: number) => {
  return NumberUtils.nanToZero(nutrition[marco] * amountInGrams / 100);
}

const nutritionFromConsumption = (consumption: Consumption): Nutrition => {
  const caloriesConsumed = caloriesByAmount(consumption.nutritionPerHundred, consumption.amount);
  const nutritions = Object.values(MarcoNutrition).reduce<Nutrition>((finalNutrition, marco) => ({
    ...finalNutrition,
    [marco]: marcoNutritionByAmount(
      marco,
      consumption.nutritionPerHundred,
      consumption.amount
    ),
  }), {} as Nutrition);

  return {
    ...nutritions,
    calories: caloriesConsumed,
  };
}
const total = (...nutritions: Nutrition[]) =>
  nutritions.reduce((sum, nutrition) => {
    const sumEntries = Object.entries(sum).map(([key, marcoSum]) => [key, marcoSum + nutrition[key as keyof Nutrition]]);
    return Object.fromEntries(sumEntries);
  }, DEFAULT_CONSUMPTION.nutritionPerHundred);

const caloriesByNutrition = (nutrition: Nutrition): NutritionCalories => {
  return Object.values(MarcoNutrition).reduce((nutritionCalories, marco) => ({
    ...nutritionCalories,
    [marco]:nutrition[marco] * MarcoNutritionCalories[marco]
  }), {} as NutritionCalories)
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  totalCalories,
  caloriesByAmount,
  marcoNutritionByAmount,
  nutritionFromConsumption,
  caloriesByNutrition,
  total,
};