import { useSetRecoilState } from "recoil";
import { MealPrep, mealPrepAtom } from "../../../atoms/MealPrepAtom";
import ConsumptionItem from "../../ConsumptionItem";
import EmptyNotice from "../../EmptyNotice";
import Button, { ButtonStyle } from "../../Input/Button";
import Section from "../../Section";
import FoodContainerSelector from "./FoodContainerSelector";
import NutritionSummary from "./NutritionSummary";

type Props = {
  mealPrep: MealPrep;
  onAddFood: () => void;
  onConfirm: () => void;
};
export default function MealPrepSummary({
  mealPrep,
  onAddFood,
  onConfirm,
}: Props) {
  const updateMealPrep = useSetRecoilState(mealPrepAtom);
  const updateContainerSelection = (sel: string[]) =>
    updateMealPrep((atom) => ({
      ...atom,
      mealPrep: { ...atom.mealPrep, containerIds: sel },
    }));
  const onRemoveFood = (index: number) => {
    const foodList = [...mealPrep.food];
    foodList.splice(index, 1);
    updateMealPrep((atom) => ({
      ...atom,
      mealPrep: { ...atom.mealPrep, food: foodList },
    }));
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      <NutritionSummary
        food={mealPrep.food}
        numContainers={mealPrep.containerIds.length}
      />
      <Section label="Food" className="flex flex-col max-h-64 gap-2">
        <div className="flex-1 min-h-[36px] overflow-y-auto py-2">
          {!mealPrep.food.length && (
            <EmptyNotice message="No food added for meal prep" />
          )}
          {mealPrep.food.map((food, i) => (
            <ConsumptionItem
              onRemove={() => onRemoveFood(i)}
              consumption={food}
              key={food.name}
            />
          ))}
        </div>
        <Button
          buttonStyle={ButtonStyle.Clear}
          className="sticky bottom-0 w-fit text-sm"
          onClick={onAddFood}
          text="Add food"
          icon="plus"
        />
      </Section>
      <FoodContainerSelector
        selectedContainersId={mealPrep.containerIds}
        onUpdateSelection={updateContainerSelection}
      />
      <div className="flex items-center gap-2 justify-end">
        <Button
          disabled={!mealPrep.food.length || !mealPrep.containerIds.length}
          onClick={onConfirm}
          text="Prep meal"
          icon="check"
        />
      </div>
    </div>
  );
}
