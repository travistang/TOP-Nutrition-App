import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import {
  DailyNutritionGoal,
  dailyNutritionGoalAtom,
} from "../../atoms/DailyNutritionGoalAtom";
import { MarcoNutrition } from "../../types/Nutrition";
import Button from "../Input/Button";
import NumberUtils from "../../utils/Number";
import Modal from "../Modal";
import NumberInput from "../Input/NumberInput";

type FormProps = Omit<DailyNutritionGoal, "modalOpened">;
export default function DailyNutritionGoalModal() {
  const [
    { modalOpened, targetNutritionIntake, targetCalories },
    setDailyNutritionGoalAtom,
  ] = useRecoilState(dailyNutritionGoalAtom);
  const [nutritionGoalPlaceholder, setNutritionGoalPlaceholder] =
    useState<FormProps>({ targetCalories, targetNutritionIntake });

  const updatePlaceholderCalories = (value: number) => {
    setNutritionGoalPlaceholder({
      ...nutritionGoalPlaceholder,
      targetCalories: value,
    });
  };

  const onClose = () =>
    setDailyNutritionGoalAtom((atom) => ({ ...atom, modalOpened: false }));

  const updatePlaceholderMarco =
    (marco: MarcoNutrition) => (value: string | number) => {
      setNutritionGoalPlaceholder({
        ...nutritionGoalPlaceholder,
        targetNutritionIntake: {
          ...nutritionGoalPlaceholder.targetNutritionIntake,
          [marco]: NumberUtils.inputAsNumber(value.toString()),
        },
      });
    };

  const saveForm = (e?: React.FormEvent) => {
    e?.preventDefault();
    setDailyNutritionGoalAtom({
      modalOpened: false,
      ...nutritionGoalPlaceholder,
    });
    toast.success("Daily nutrition goal updated");
  };

  return (
    <Modal onClose={onClose} opened={modalOpened} label="Daily nutrition goals">
      <form onSubmit={saveForm} className="grid grid-cols-6 gap-2 py-4">
        <NumberInput
          label="Target calories (kcal)"
          className="col-span-6"
          value={nutritionGoalPlaceholder.targetCalories}
          onChange={updatePlaceholderCalories}
        />
        {Object.values(MarcoNutrition).map((marco) => (
          <NumberInput
            key={marco}
            label={`Target ${marco} intake (g)`}
            className="col-span-3"
            value={nutritionGoalPlaceholder.targetNutritionIntake[marco]}
            onChange={updatePlaceholderMarco(marco)}
          />
        ))}
        <Button
          type="button"
          onClick={onClose}
          text="Cancel"
          className="col-start-1"
          textClassName="text-gray-200"
        />
        <Button
          type="submit"
          onClick={() => saveForm()}
          text="Update Goal"
          textClassName="text-gray-200"
          className="rounded-lg col-span-2 bg-blue-700 col-start-5 h-12"
        />
      </form>
    </Modal>
  );
}
