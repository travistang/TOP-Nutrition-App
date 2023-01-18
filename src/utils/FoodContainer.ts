import { Food } from "../types/Food";
import { FoodContainer } from "../types/FoodContainer";
import { Nutrition } from "../types/Nutrition";
import NutritionUtils from './Nutrition';

const nutritionInContainer = (container: FoodContainer): Nutrition => {
  return NutritionUtils.total(
    ...container.content.map(NutritionUtils.nutritionFromConsumption)
  );
};

const mergeDuplicatedFoodContent = (content: Food[]): Food[] => {
  const contentByName = content.reduce((contentNameMapping, food) => {
    const existingFoodContentByName = contentNameMapping[food.name];
    if (!existingFoodContentByName) return {
      ...contentNameMapping,
      [food.name]: food
    };

    if (!NutritionUtils.isEqual(existingFoodContentByName.nutritionPerHundred, food.nutritionPerHundred)) {
      throw new Error("Food having the same name should also have the same nutrition per 100g");
    }

    const combinedFoodContent: Food = {
      ...food,
      amount: food.amount + existingFoodContentByName.amount
    };
    return {
      ...contentNameMapping,
      [food.name]: combinedFoodContent
    };

  }, {} as Record<string, Food>);

  return Object.values(contentByName);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nutritionInContainer,
  mergeDuplicatedFoodContent,
};
