import FoodContainerDatabase from "../database/FoodContainerDatabase";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../database/ConsumptionDatabase";

import NumberUtils from "../utils/Number";
import { Food } from "../types/Food";
import { Consumption } from "../types/Consumption";

export const splitMealToContainer = async (
  meal: ConsumptionRecord[],
  toContainerRatio: number,
  containerId: string
): Promise<void> => {
  const foodContentToContainer = meal.map<Food>((food) => ({
    name: food.name,
    nutritionPerHundred: food.nutritionPerHundred,
    amount: food.amount * toContainerRatio,
  }));
  await FoodContainerDatabase.addFoodContentToContainer(
    containerId,
    foodContentToContainer
  );
  if (NumberUtils.isCloseTo(toContainerRatio, 1)) {
    await Promise.all(
      meal.map((consumption) => ConsumptionDatabase.remove(consumption.id))
    );
    return;
  }
  await Promise.all(
    meal.map((consumption) =>
      ConsumptionDatabase.edit(consumption.id, {
        ...consumption,
        amount: consumption.amount * (1 - toContainerRatio),
      })
    )
  );
};

export const splitMeal = async (
  meal: ConsumptionRecord[],
  newMealRatio: number,
  nextMealDate: number
) => {
  const shouldMoveMealToNewDate = NumberUtils.isCloseTo(newMealRatio, 1);
  if (shouldMoveMealToNewDate) {
    return Promise.all(
      meal.map((consumption) =>
        ConsumptionDatabase.edit(consumption.id, {
          ...consumption,
          date: nextMealDate,
        })
      )
    );
  }

  const newConsumptions: Consumption[] = meal.map(
    ({ id: _, ...prevRecord }) => {
      return {
        ...prevRecord,
        date: nextMealDate,
        amount: newMealRatio * prevRecord.amount,
      };
    }
  );
  const updatedOldConsumptions = meal.map((prevRecord) => ({
    ...prevRecord,
    amount: (1 - newMealRatio) * prevRecord.amount,
  }));

  await Promise.all([
    ...updatedOldConsumptions.map((updatedRecord) =>
      ConsumptionDatabase.edit(updatedRecord.id, updatedRecord)
    ),
    ...newConsumptions.map((newRecord) => ConsumptionDatabase.add(newRecord)),
  ]);
};
