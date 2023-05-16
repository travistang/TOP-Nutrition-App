import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { addDays } from "date-fns";
import toast from "react-hot-toast";

import { splitMealModalAtom } from "../../atoms/SplitMealModalAtom";
import InputBase from "../Input/InputBase";
import Button, { ButtonStyle } from "../Input/Button";
import Modal from "../Modal";
import NutritionUtils from "../../utils/Nutrition";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import DateInput, { DateInputType } from "../Input/DateInput";
import PortionSummary from "./PortionSummary";

type SplitMealFormValue = {
  splitRatio: number;
  nextMealDate: number;
};

export default function SplitMealModal() {
  const [splitMealModalState, setSplitMealModalState] =
    useRecoilState(splitMealModalAtom);
  const [{ splitRatio, nextMealDate }, setForm] = useState<SplitMealFormValue>({
    splitRatio: 1,
    nextMealDate: addDays(Date.now(), 1).getTime(),
  });
  const { modalOpened, meal } = splitMealModalState;
  const mealNutrition = NutritionUtils.total(
    ...meal.map(NutritionUtils.nutritionFromConsumption)
  );
  const currentMealCalories = NutritionUtils.multiply(
    mealNutrition,
    1 - splitRatio
  ).calories;
  const nextMealCalories = NutritionUtils.multiply(
    mealNutrition,
    splitRatio
  ).calories;

  const isFormValid = splitRatio > 0;
  const onClose = useCallback(() => {
    setSplitMealModalState({ meal: [], modalOpened: false });
  }, []);

  const splitMeal = async () => {
    if (!isFormValid) {
      return;
    }

    try {
      await ConsumptionDatabase.splitMeal(meal, splitRatio, nextMealDate);
      toast.success("Meal split!");
      onClose();
    } catch {
      toast.error("Failed to split meal");
    }
  };

  return (
    <Modal
      opened={modalOpened}
      label="Splitting meal for later time"
      onClose={onClose}
    >
      <div className="grid grid-cols-6 gap-x-2 gap-y-4 py-2">
        <PortionSummary
          title="Current Meal"
          className="col-start-1 col-span-full"
          calories={currentMealCalories}
          ratio={1 - splitRatio}
        />
        <InputBase label="" className="col-span-full">
          <input
            value={splitRatio}
            onChange={(e) =>
              setForm({ nextMealDate, splitRatio: parseFloat(e.target.value) })
            }
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </InputBase>
        <PortionSummary
          title="Next Meal"
          className="col-span-full self-end flex-row-reverse"
          calories={nextMealCalories}
          ratio={splitRatio}
          reversed
        />
        <DateInput
          label="Next meal date"
          dateType={DateInputType.DateTime}
          className="col-span-3"
          onChange={(mealDate) =>
            setForm({
              nextMealDate: mealDate.getTime(),
              splitRatio,
            })
          }
          value={nextMealDate}
        />

        <Button
          buttonStyle={ButtonStyle.Clear}
          text="Cancel"
          type="button"
          className="col-start-1"
          onClick={onClose}
        />
        <Button
          text="Split"
          type="submit"
          disabled={!isFormValid}
          className="col-start-5 h-12 col-end-7 rounded-lg"
          onClick={splitMeal}
        />
      </div>
    </Modal>
  );
}
