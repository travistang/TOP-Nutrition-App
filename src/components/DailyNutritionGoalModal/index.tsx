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
import SelectInput from "../Input/SelectInput";
import { TargetCaloriesConfig, TargetCaloriesConfigType } from "../../types/TargetCalories";
import { AllKey } from "../../types/utils";
import { getDefaultTargetCaloriesConfig } from "../../domain/TargetCalories";

type FormProps = Omit<DailyNutritionGoal, "modalOpened">;
export default function DailyNutritionGoalModal() {
  const [
    { modalOpened, targetNutritionIntake, targetCaloriesConfig },
    setDailyNutritionGoalAtom,
  ] = useRecoilState(dailyNutritionGoalAtom);
  const [nutritionGoalPlaceholder, setNutritionGoalPlaceholder] =
    useState<FormProps>({ targetCaloriesConfig, targetNutritionIntake });

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

  const updateTargetCaloriesConfig = <T extends AllKey<TargetCaloriesConfig>>(field: T) => (value: any) => {
    if (field === 'type') {
      const newTargetConfig = getDefaultTargetCaloriesConfig(value as TargetCaloriesConfigType);
      setNutritionGoalPlaceholder({
        ...nutritionGoalPlaceholder,
        targetCaloriesConfig: newTargetConfig,
      });
      return;
    }
    setNutritionGoalPlaceholder({
      ...nutritionGoalPlaceholder,
      targetCaloriesConfig: {
        ...nutritionGoalPlaceholder.targetCaloriesConfig,
        [field]: value,
      }
    })
  }
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
        {Object.values(MarcoNutrition).map((marco) => (
          <NumberInput
            key={marco}
            label={`${marco} intake (g)`}
            className="col-span-2"
            value={nutritionGoalPlaceholder.targetNutritionIntake[marco]}
            onChange={updatePlaceholderMarco(marco)}
          />
        ))}
        <span className="col-span-full text-xs">
          Target calories
        </span>
        <SelectInput
          className="col-span-3"
          label="Target calories type"
          value={nutritionGoalPlaceholder.targetCaloriesConfig.type}
          onSelect={updateTargetCaloriesConfig('type')}
          options={Object.values(TargetCaloriesConfigType).map(type => ({ label: type, value: type }))}
        />
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
          className="rounded-lg col-span-2 bg-gray-700 col-start-5 h-12"
        />
      </form>
    </Modal>
  );
}
