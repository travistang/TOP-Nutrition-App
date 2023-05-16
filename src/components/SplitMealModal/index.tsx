import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { splitMealModalAtom } from "../../atoms/SplitMealModalAtom";

import Button, { ButtonStyle } from "../Input/Button";
import DateInput, { DateInputType } from "../Input/DateInput";
import TabSelectInput from "../Input/TabSelectInput";

import MealSplitView from "./MealSplitView";
import Modal from "../Modal";
import useSplitMealForm, { SplitMealMode } from "./useSplitMealForm";
import FoodContainerPicker from "./FoodContainerPicker";

const splitMealModeOptions = [
  {
    text: "Next meal",
    icon: "hamburger" as IconProp,
    value: SplitMealMode.NextMeal,
  },
  {
    text: "To container",
    icon: "box" as IconProp,
    value: SplitMealMode.ToContainer,
  },
];

export default function SplitMealModal() {
  const [splitMealModalState, setSplitMealModalState] =
    useRecoilState(splitMealModalAtom);
  const { modalOpened, meal } = splitMealModalState;
  const {
    splitRatio,
    nextMealDate,
    splitMealMode,
    targetFoodContainerId,
    setFormValue,
    split,
    isFormValid,
  } = useSplitMealForm(meal);

  const onClose = useCallback(() => {
    setSplitMealModalState({ meal: [], modalOpened: false });
  }, [setSplitMealModalState]);

  const splitMealWithFeedback = async () => {
    const mealSplit = await split();
    if (mealSplit) {
      toast.success("Meal split!");
      onClose();
    } else {
      toast.error("Failed to split meal");
    }
  };

  return (
    <Modal
      opened={modalOpened}
      label="Splitting meal for later time"
      onClose={onClose}
    >
      <div className="flex flex-col items-stretch gap-x-2 gap-y-4 py-2">
        <MealSplitView
          meal={meal}
          splitRatio={splitRatio}
          onChangeRatio={setFormValue("splitRatio")}
        />
        <TabSelectInput
          onSelect={setFormValue("splitMealMode")}
          options={splitMealModeOptions}
          selected={splitMealMode}
        />
        {splitMealMode === SplitMealMode.NextMeal && (
          <DateInput
            label="Next meal date"
            dateType={DateInputType.DateTime}
            className="col-span-3"
            onChange={(mealDate) => {
              setFormValue("nextMealDate")(mealDate.getTime());
            }}
            value={nextMealDate}
          />
        )}
        {splitMealMode === SplitMealMode.ToContainer && (
          <FoodContainerPicker
            selectedContainerId={targetFoodContainerId ?? null}
            label="Choose the food container"
            onSelect={setFormValue("targetFoodContainerId")}
          />
        )}
        <div className="flex items-center justify-between">
          <Button
            buttonStyle={ButtonStyle.Clear}
            text="Cancel"
            type="button"
            className="h-12 px-2"
            onClick={onClose}
          />
          <Button
            text="Split"
            type="submit"
            disabled={!isFormValid}
            className="h-12 px-2"
            onClick={splitMealWithFeedback}
          />
        </div>
      </div>
    </Modal>
  );
}
