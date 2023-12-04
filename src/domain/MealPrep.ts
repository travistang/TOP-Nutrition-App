import { MealPrep } from "../atoms/MealPrepAtom";
import FoodContainerDatabase from "../database/FoodContainerDatabase";

export const prepMeal = async (prep: MealPrep) => {
  const { food: foods, containerIds } = prep;
  if (!foods.length || !containerIds.length) {
    throw new Error("Invalid meal prep");
  }
  const portionPerContainer = foods.map((food) => ({
    ...food,
    amount: food.amount / containerIds.length,
  }));
  await Promise.all(
    containerIds.map((containerId) => {
      return FoodContainerDatabase.addFoodContentToContainer(
        containerId,
        portionPerContainer
      );
    })
  );
};
