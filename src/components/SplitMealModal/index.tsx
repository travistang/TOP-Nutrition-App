import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { addDays, isAfter } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

import { splitMealModalAtom } from "../../atoms/SplitMealModalAtom";
import InputBase from "../Input/InputBase";
import Button, { ButtonStyle } from "../Input/Button";
import Modal from "../Modal";
import NutritionFacts from "../NutritionFacts";
import NutritionUtils from "../../utils/Nutrition";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import PortionSummary from "./PortionSummary";
import DateInput, { DateInputType } from "../Input/DateInput";

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
  const mealWeight = NutritionUtils.weight(mealNutrition);

  const isFormValid = splitRatio > 0 && isAfter(nextMealDate, Date.now());
  const onClose = () => {
    setSplitMealModalState({ meal: [], modalOpened: false });
  };
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
        <InputBase label="Split ratio" className="col-span-full">
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
        <PortionSummary
          label="Current meal"
          mealWeight={mealWeight}
          ratio={1 - splitRatio}
          className="col-start-1"
        />
        <PortionSummary
          label="Next meal"
          mealWeight={mealWeight}
          ratio={splitRatio}
        />

        <div className="col-span-full flex flex-no-wrap items-center">
          <NutritionFacts
            unit=""
            nutrition={NutritionUtils.multiply(mealNutrition, 1 - splitRatio)}
            className="flex-1"
          />
          <FontAwesomeIcon
            icon="arrow-right"
            className="self-center mx-1 text-white"
          />
          <NutritionFacts
            unit=""
            nutrition={NutritionUtils.multiply(mealNutrition, splitRatio)}
            className="flex-1"
          />
        </div>
        <Button
          buttonStyle={ButtonStyle.Clear}
          text="Cancel"
          type="button"
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
