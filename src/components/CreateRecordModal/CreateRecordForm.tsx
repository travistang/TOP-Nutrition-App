import React from "react";
import { useRecoilState } from "recoil";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import { Consumption, DEFAULT_CONSUMPTION } from "../../types/Consumption";
import NutritionUtils from "../../utils/Nutrition";

import Button from "../Input/Button";
import DateInput, { DateInputType } from "../Input/DateInput";
import NumberInput from "../Input/NumberInput";
import NutritionFacts from "../NutritionFacts";
import ScalarWidget from "../Widgets/ScalarWidget";
import ButtonRow from "./ButtonRow";
import EstimatedCaloriesConsumption from "./EstimatedCaloriesConsumption";
import NameInput from "./NameInput";
import SubmitButton from "./SubmitButton";

export default function CreateRecordForm() {
  const [createEditRecord, setCreateEditRecord] =
    useRecoilState(createEditRecordAtom);
  const { record: consumption } = createEditRecord;
  const isEditing = !!consumption.id;
  const isFormValid = !!consumption.name && consumption.amount > 0;

  const setConsumption = (consumption: Consumption) =>
    setCreateEditRecord({ ...createEditRecord, record: consumption });

  const onClose = () => {
    setCreateEditRecord({
      openingSource: null,
      record: { ...DEFAULT_CONSUMPTION, date: Date.now() },
    });
  };
  const updateField =
    (field: keyof Omit<Consumption, "nutritionPerHundred">) =>
      (value: string | number) => {
        setConsumption({ ...consumption, [field]: value });
      };

  const updateAmount = (value: number) => {
    setConsumption({
      ...consumption,
      amount: value,
    });
  };

  const updateDate = (date: Date) => {
    setConsumption({
      ...consumption,
      date: date.getTime(),
    });
  };

  const totalCaloriesByAmount = NutritionUtils.caloriesByAmount(
    consumption.nutritionPerHundred,
    consumption.amount
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-6 gap-2 p-2"
    >
      <NameInput onChange={updateField("name")} consumption={consumption} />
      <NumberInput
        label="Amount (g)"
        value={consumption.amount}
        onChange={updateAmount}
        className="col-span-2"
      />
      <DateInput
        label="Date"
        dateType={DateInputType.DateTime}
        value={consumption.date}
        onChange={updateDate}
        className="col-span-4"
      />
      <Button
        className="col-span-2 self-end h-12 gap-1"
        onClick={() => updateDate(new Date())}
        textClassName="text-xs gap-1 child:fill-gray-200"
        text="Now"
        icon="clock"
      />
      <NutritionFacts
        nutrition={consumption.nutritionPerHundred}
        servingNutrition={{
          amount: consumption.amount,
          ...NutritionUtils.nutritionFromConsumption(consumption),
        }}
        onChange={(updatedNutrition) =>
          setConsumption({
            ...consumption,
            nutritionPerHundred: updatedNutrition,
          })
        }
        className="col-span-full sm:col-span-3 md:col-span-2"
      />
      <div className="grid grid-cols-6 col-span-full gap-2 bg-gray-200 sticky bottom-0">
        <EstimatedCaloriesConsumption record={consumption} />
        <ScalarWidget
          label="Total Calories:"
          value={totalCaloriesByAmount}
          unit="kcal"
          className="col-start-4 col-end-7 sticky bottom-12"
        />
        <ButtonRow
          onClose={onClose}
          isEditing={isEditing}
          consumption={consumption}
        />
        <SubmitButton
          onClose={onClose}
          consumption={consumption}
          isFormValid={isFormValid}
          isEditing={isEditing}
        />
      </div>
    </form>
  )
}