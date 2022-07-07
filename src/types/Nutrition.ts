export enum MarcoNutrition {
  carbohydrates = 'carbohydrates',
  fat = 'fat',
  protein = 'protein',
}

export const MarcoNutritionCalories: Record<MarcoNutrition, number> = {
  [MarcoNutrition.carbohydrates]: 4,
  [MarcoNutrition.protein]: 4,
  [MarcoNutrition.fat]: 9,
}

export const MarcoNutritionColor: Record<MarcoNutrition, string> = {
  [MarcoNutrition.carbohydrates]: 'rgb(76, 184, 154)',
  [MarcoNutrition.fat]: 'rgb(198, 95, 84)',
  [MarcoNutrition.protein]: 'rgb(228, 177, 0)',
};

export type Nutrition = { [N in MarcoNutrition]: number } & {
  calories: number;
};

export type NutritionCalories = { [N in MarcoNutrition]: number};