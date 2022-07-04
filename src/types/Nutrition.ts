export enum MarcoNutrition {
  carbohydrates = 'carbohydrates',
  protein = 'protein',
  fat = 'fat',
}

export const MarcoNutritionCalories: Record<MarcoNutrition, number> = {
  [MarcoNutrition.carbohydrates]: 4,
  [MarcoNutrition.protein]: 4,
  [MarcoNutrition.fat]: 4,
}

export type Nutrition = { [N in MarcoNutrition]: number } & {
  calories: number;
};
