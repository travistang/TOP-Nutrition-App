import { useState } from "react";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { DEFAULT_MEAL_PREP, mealPrepAtom } from "../../atoms/MealPrepAtom";
import { Food } from "../../types/Food";
import StepAddFoodContentForm from "../FoodContainers/FoodContainerDetailPage/AddFoodContainerContentModal/StepAddFoodContentForm";
import Modal from "../Modal";
import MealPrepSummary from "./MealPrepSummary";
import { prepMeal } from "../../domain/MealPrep";

enum MealPrepModalState {
  Summary = "summary",
  AddingFood = "adding-food",
}

export default function MealPrepModal() {
  const [state, setState] = useState<MealPrepModalState>(
    MealPrepModalState.Summary
  );
  const [mealPrepAtomValue, setMealPrepAtomValue] =
    useRecoilState(mealPrepAtom);
  const { modalOpened, mealPrep } = mealPrepAtomValue;
  const onAddFood = (food: Food) => {
    setMealPrepAtomValue((atom) => ({
      ...atom,
      mealPrep: {
        ...mealPrep,
        food: [...mealPrep.food, food],
      },
    }));
    setState(MealPrepModalState.Summary);
  };

  const onConfirmMealPrep = async () => {
    try {
      await prepMeal(mealPrep);
      toast.success("Meal prep completed");
      setMealPrepAtomValue(({
        modalOpened: false,
        mealPrep: DEFAULT_MEAL_PREP,
      }));
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() =>
        setMealPrepAtomValue((atom) => ({ ...atom, modalOpened: false }))
      }
      label="Meal prep"
    >
      {state === MealPrepModalState.Summary && (
        <MealPrepSummary
          onConfirm={onConfirmMealPrep}
          mealPrep={mealPrep}
          onAddFood={() => setState(MealPrepModalState.AddingFood)}
        />
      )}
      {state === MealPrepModalState.AddingFood && (
        <StepAddFoodContentForm
          onClose={() => setState(MealPrepModalState.Summary)}
          onAddFoodContent={onAddFood}
        />
      )}
    </Modal>
  );
}
