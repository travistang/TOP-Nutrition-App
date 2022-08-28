import React from "react";
import { useSetRecoilState } from "recoil";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import ConsumptionItem from "../ConsumptionItem";
import MealUtils from "../../utils/Meal";

import MealSummaryHeader from "./MealSummaryHeader";

type Props = {
  meal: ConsumptionRecord[];
  caloriesIntakeOfDay: number;
  index: number;
};
export default function MealSummary({
  caloriesIntakeOfDay,
  meal,
  index,
}: Props) {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const editRecord = (consumption: Consumption) => () => {
    setCreateEditRecord({
      modalOpened: true,
      record: consumption,
    });
  };
  const mealNutrition = MealUtils.totalNutrition(meal);
  const mealCalories = mealNutrition.calories;

  return (
    <div
      key={meal[0].id}
      className="rounded-lg flex flex-col px-2 pb-2 flex-shrink-0 bg-gray-300 mb-2"
    >
      <MealSummaryHeader
        meal={meal}
        index={index}
        caloriesIntakeOfDay={caloriesIntakeOfDay}
      />
      {meal.map((consumption) => (
        <ConsumptionItem
          key={consumption.id}
          mealCalories={mealCalories}
          consumption={consumption}
          onClick={editRecord(consumption)}
        />
      ))}
    </div>
  );
}
