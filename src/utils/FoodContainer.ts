import { FoodContainer } from "../types/FoodContainer";
import { Nutrition } from "../types/Nutrition";
import NutritionUtils from './Nutrition';

const nutritionInContainer = (container: FoodContainer): Nutrition => {
  return NutritionUtils.total(
    ...container.content.map(NutritionUtils.nutritionFromConsumption)
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nutritionInContainer,
}
