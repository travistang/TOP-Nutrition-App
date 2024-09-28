import { Food } from "../types/Food";
import { FoodContainer } from "../types/FoodContainer";
import { Nutrition } from "../types/Nutrition";
import NutritionUtils from "./Nutrition";

const nutritionInContainer = (container: FoodContainer): Nutrition => {
  return NutritionUtils.total(
    ...container.content.map(NutritionUtils.nutritionFromConsumption)
  );
};

const mergeDuplicatedFoodContent = (content: Food[]): Food[] => {
  const contentByName = content.reduce((contentNameMapping, food) => {
    const existingFoodContentByName = contentNameMapping[food.name];
    if (!existingFoodContentByName)
      return {
        ...contentNameMapping,
        [food.name]: food,
      };

    if (
      !NutritionUtils.isEqual(
        existingFoodContentByName.nutritionPerHundred,
        food.nutritionPerHundred
      )
    ) {
      throw new Error(
        "Food having the same name should also have the same nutrition per 100g"
      );
    }

    const combinedFoodContent: Food = {
      ...food,
      amount: food.amount + existingFoodContentByName.amount,
    };
    return {
      ...contentNameMapping,
      [food.name]: combinedFoodContent,
    };
  }, {} as Record<string, Food>);

  return Object.values(contentByName);
};

const computeFoodContainerPreparationDate = (
  container: FoodContainer,
  newContent: Food[]
): FoodContainer["preparationDate"] => {
  const hasCurrentContent = container.content.length > 0;
  const hasNewContent = newContent.length > 0;

  const isConsumingAllContent = hasCurrentContent && !hasNewContent;
  if (isConsumingAllContent) return undefined;

  const isFirstAddingContent = !hasCurrentContent && hasNewContent;
  if (isFirstAddingContent) return Date.now();

  const isPartiallyConsumingContent = hasCurrentContent && hasNewContent;
  if (isPartiallyConsumingContent) return container.preparationDate;

  return undefined;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nutritionInContainer,
  mergeDuplicatedFoodContent,
  computeFoodContainerPreparationDate,
};
