import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { addDays, isAfter } from "date-fns";
import { splitMealModalAtom } from "../../atoms/SplitMealModalAtom";
import InputBase from "../Input/InputBase";
import Modal from "../Modal";
import NutritionFacts from "../NutritionFacts";
import NutritionUtils from "../../utils/Nutrition";
import DateUtils from "../../utils/Date";
import NumberSummary from "../NumberSummary";
import TextInput from "../Input/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Input/Button";
import classNames from "classnames";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import toast from "react-hot-toast";

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
  const originalMealSummary = `≈${(mealWeight * (1 - splitRatio)).toFixed(
    2
  )}g, ${((1 - splitRatio) * 100).toFixed(0)}%`;
  const summaryText = `≈${(mealWeight * splitRatio).toFixed(2)}g, ${(
    splitRatio * 100
  ).toFixed(0)}%`;
  const isFormValid =
    0 < splitRatio && splitRatio < 1 && isAfter(nextMealDate, Date.now());
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
        <TextInput
          label="Next meal date"
          type="datetime-local"
          className="col-span-3"
          onChange={(mealDate) =>
            setForm({
              nextMealDate: DateUtils.stringToDate(mealDate),
              splitRatio,
            })
          }
          value={DateUtils.toInputFormat(nextMealDate)}
        />
        <NumberSummary
          label="Portion of current meal"
          value={originalMealSummary}
          className="flex flex-col col-start-1 col-span-3 gap-1"
        />
        <NumberSummary
          label="Portion to next meal"
          value={summaryText}
          className="flex flex-col col-start-4 col-span-3 gap-1"
        />
        <div className="col-span-full flex flex-no-wrap items-center">
          <NutritionFacts
            nutrition={NutritionUtils.multiply(mealNutrition, 1 - splitRatio)}
            className="flex-1"
          />
          <FontAwesomeIcon
            icon="arrow-right"
            className="self-center mx-1 text-white"
          />
          <NutritionFacts
            nutrition={NutritionUtils.multiply(mealNutrition, splitRatio)}
            className="flex-1"
          />
        </div>
        <Button text="Cancel" type="button" onClick={onClose} />
        <Button
          text="Split"
          type="submit"
          className={classNames(
            "col-start-5 h-12 col-end-7 rounded-lg bg-blue-400",
            isFormValid ? "bg-blue-900" : "bg-blue-400 cursor-not-allowed"
          )}
          textClassName={isFormValid ? "text-gray-200" : ""}
          onClick={splitMeal}
        />
      </div>
    </Modal>
  );
}
