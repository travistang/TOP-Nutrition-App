import { Food } from "../../../types/Food";
import { FoodContainer } from "../../../types/FoodContainer";
import NutritionRatioBar from "../../NutritionRatioBar";
import FoodContainerUtils from "../../../utils/FoodContainer";
import Section from "../../Section";
import NutritionFacts from "../../NutritionFacts";

type Props = {
  food: Food[];
  numContainers: number;
};
export default function NutritionSummary({ food, numContainers }: Props) {
  if (numContainers === 0) return null;
  const portionPerContainer = food.map((f) => ({
    ...f,
    amount: f.amount / numContainers,
  }));

  const nutritionPerContainer = FoodContainerUtils.nutritionInContainer({
    content: portionPerContainer,
  } as FoodContainer);
  return (
    <Section label="Nutrition per container">
      <NutritionFacts nutrition={nutritionPerContainer} />
      <NutritionRatioBar nutrition={nutritionPerContainer} className="h-3" />
    </Section>
  );
}
