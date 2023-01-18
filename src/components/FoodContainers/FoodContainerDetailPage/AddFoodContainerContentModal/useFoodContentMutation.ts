import toast from "react-hot-toast";
import FoodContainerDatabase from "../../../../database/FoodContainerDatabase";
import { Food } from "../../../../types/Food";
import { FoodContainer } from "../../../../types/FoodContainer";

export default function useFoodContentMutation(foodContainer: FoodContainer) {
  const onAddFoodContent = async (food: Food) => {
     const content = [...foodContainer.content, food];
     await FoodContainerDatabase.setFoodContainerContentById(
       foodContainer.identifier,
       content
     );
     toast.success("Food added");
  }

    const onRemoveFoodContent = async (food: Food) => {
      const content = foodContainer.content.filter(
        (content) => content.name !== food.name
      );
      await FoodContainerDatabase.setFoodContainerContentById(
        foodContainer.identifier,
        content
      );
      toast.success("Food removed");
    };


  return { onAddFoodContent, onRemoveFoodContent }
}