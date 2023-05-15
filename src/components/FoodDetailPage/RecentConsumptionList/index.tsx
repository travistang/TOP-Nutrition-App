import React from "react";
import { format } from "date-fns";
import NutritionUtils from "../../../utils/Nutrition";
import Chip from "../../Chip";
import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";
import { MarcoNutrition, MarcoNutritionColor } from "../../../types/Nutrition";
import EmptyNotice from "../../EmptyNotice";

const getCaloriesTextByRecord = (record: ConsumptionRecord) => {
  const calories = NutritionUtils.caloriesByAmount(
    record.nutritionPerHundred,
    record.amount
  ).toFixed(0);
  return `${calories} kcal`;
};

const getMarcoTextByRecord = (
  record: ConsumptionRecord,
  marco: MarcoNutrition
) => {
  const marcoInGrams = NutritionUtils.marcoNutritionByAmount(
    marco,
    record.nutritionPerHundred,
    record.amount
  );
  return `${marcoInGrams.toFixed(0)} g`;
};
type Props = {
  records: ConsumptionRecord[];
};
export default function RecentConsumptionList({ records }: Props) {
  return (
    <>
      {records.length === 0 && (
        <EmptyNotice
          message="No consumption of this food in this month"
          icon="hamburger"
          className="h-36 flex-shrink-0"
        />
      )}
      {records.map((record) => (
        <div
          key={record.id}
          className="p-2 h-12 grid grid-cols-6 grid-rows-2 items-center gap-y-1"
        >
          <div className="col-start-1 row-start-1 row-span-full col-span-1 text-xs text-gray-400">
            {format(record.date, "dd/MM HH:mm")}
          </div>
          <div className="col-span-3 row-start-1 font-bold">
            {record.amount.toFixed(1)} g
          </div>
          <div className="col-span-3 row-start-2 flex items-center gap-2">
            {Object.values(MarcoNutrition).map((marco) => (
              <Chip
                className="text-xs px-2 text-white"
                text={getMarcoTextByRecord(record, marco)}
                color={MarcoNutritionColor[marco]}
              />
            ))}
          </div>
          <div className="h-6 text-sm font-bold self-center col-span-2 col-ends-2 row-start-0 row-span-full flex items-center justify-end">
            {getCaloriesTextByRecord(record)}
          </div>
        </div>
      ))}
    </>
  );
}
