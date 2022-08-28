import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import NumberSummary from "../NumberSummary";
import NutritionUtils from "../../utils/Nutrition";

type Props = {
  record: Consumption & Partial<ConsumptionRecord>;
};
export default function EstimatedCaloriesConsumption({ record }: Props) {
  const consumptionsOfDay = useLiveQuery(
    () =>
      ConsumptionDatabase.consumptionsOfDay(new Date(record.date).getTime()),
    [record]
  );
  console.log({ consumptionsOfDay });
  const caloriesFromRecord = NutritionUtils.caloriesByAmount(
    record.nutritionPerHundred,
    record.amount
  );

  const totalCaloriesOfDay = NutritionUtils.total(
    ...(consumptionsOfDay
      ?.filter((c) => c.id !== record.id)
      .map(NutritionUtils.nutritionFromConsumption) ?? [])
  ).calories;

  const projectedCalories = totalCaloriesOfDay + caloriesFromRecord;
  return (
    <NumberSummary
      label="Calories today:"
      value={`${projectedCalories.toFixed(2)} kcal`}
      className="col-span-3 sticky bottom-12"
    />
  );
}
