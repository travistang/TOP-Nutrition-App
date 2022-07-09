import React from "react";
import { useSetRecoilState } from "recoil";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import ConsumptionItem from "../ConsumptionItem";
import NumberUtils from "../../utils/Number";
import NutritionUtils from "../../utils/Nutrition";
import { format } from "date-fns";
import Chip from "../Chip";
import { MarcoNutritionColor } from "../../types/Nutrition";

type Props = {
  meal: ConsumptionRecord[];
  index: number;
};
export default function MealSummary({ meal, index }: Props) {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const editRecord = (consumption: Consumption) => () => {
    setCreateEditRecord({
      modalOpened: true,
      record: consumption,
    });
  };

  const totalCalories = NumberUtils.sum(
    ...meal.map((con) =>
      NutritionUtils.caloriesByAmount(con.nutritionPerHundred, con.amount)
    )
  );

  return (
    <div
      key={meal[0].id}
      className="rounded-lg flex flex-col px-2 pb-2 flex-shrink-0 bg-gray-300 mb-2"
    >
      <div className="flex-shirnk-0 sticky top-0 rounded-t-lg h-12 flex flex-row items-center justify-between bg-gray-300 shadow-md -mx-2 px-2">
        <span className="text-gray-500">
          Meal {index + 1} @ {format(meal[0].date, "HH:mm")}
        </span>
        <Chip
          text={`${totalCalories.toFixed(1)} kcal`}
          color={MarcoNutritionColor.protein}
          className="h-6 items-center flex text-gray-100 text-xs px-2"
        />
      </div>
      {meal.map((consumption) => (
        <ConsumptionItem
          key={consumption.id}
          consumption={consumption}
          onClick={editRecord(consumption)}
        />
      ))}
    </div>
  );
}
