import NumberUtils from "./Number";
import {
  MarcoNutrition,
  MarcoNutritionCalories,
  Nutrition,
  NutritionCalories,
} from "../types/Nutrition";
import { Consumption, DEFAULT_CONSUMPTION } from "../types/Consumption";

const totalCalories = (nutrition: Nutrition) =>
  Object.values(MarcoNutrition).reduce(
    (sum, marco) => sum + MarcoNutritionCalories[marco] * nutrition[marco],
    0
  );
const caloriesByAmount = (nutrition: Nutrition, amountInGrams: number) => {
  return NumberUtils.nanToZero((nutrition.calories * amountInGrams) / 100);
};

const marcoNutritionByAmount = (
  marco: MarcoNutrition,
  nutrition: Nutrition,
  amountInGrams: number
) => {
  return NumberUtils.nanToZero((nutrition[marco] * amountInGrams) / 100);
};

const nutritionFromConsumption = (consumption: Consumption): Nutrition => {
  const caloriesConsumed = caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );
  const nutritions = Object.values(MarcoNutrition).reduce<Nutrition>(
    (finalNutrition, marco) => ({
      ...finalNutrition,
      [marco]: marcoNutritionByAmount(
        marco,
        consumption.nutritionPerHundred,
        consumption.amount
      ),
    }),
    {} as Nutrition
  );

  return {
    ...nutritions,
    calories: caloriesConsumed,
  };
};

const multiply = <T extends Nutrition>(nutrition: T, factor: number): T => Object.fromEntries(
  Object.entries(nutrition).map(([key, value]) => [key,
    typeof value === 'number' ? value * factor : value,
  ])
) as T;

const total = (...nutritionRecords: Nutrition[]) =>
  nutritionRecords.reduce((sum, nutrition) => {
    const sumEntries = Object.entries(sum).map(([key, marcoSum]) => [
      key,
      marcoSum + nutrition[key as keyof Nutrition],
    ]);
    return Object.fromEntries(sumEntries);
  }, DEFAULT_CONSUMPTION.nutritionPerHundred);

const caloriesByNutrition = (nutrition: Nutrition): NutritionCalories => {
  return Object.values(MarcoNutrition).reduce(
    (nutritionCalories, marco) => ({
      ...nutritionCalories,
      [marco]: nutrition[marco] * MarcoNutritionCalories[marco],
    }),
    {} as NutritionCalories
  );
};

const isEqual = (a: Nutrition, b: Nutrition): boolean => {
  return Object.keys(a).every(
    (field) => {
      const key = field as keyof Nutrition;
      const diff = a[key] - b[key];
      return Math.abs(diff) <= 0.01;
    }
  );
};

const weight = (nutrition: Nutrition): number => {
  return Object.values(MarcoNutrition).reduce((sum, marco) => sum + nutrition[marco], 0);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  totalCalories,
  caloriesByAmount,
  marcoNutritionByAmount,
  nutritionFromConsumption,
  caloriesByNutrition,
  total,
  isEqual,
  multiply,
  weight,
};
