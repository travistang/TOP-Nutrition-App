import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import NutritionUtils from "../../utils/Nutrition";
import ScalarWidget from "../Widgets/ScalarWidget";

type Props = {
  record: Consumption & Partial<ConsumptionRecord>;
};
export default function EstimatedCaloriesConsumption({ record }: Props) {
  const consumptionsOfDay = useLiveQuery(
    () =>
      ConsumptionDatabase.consumptionsOfDay(new Date(record.date).getTime()),
    [record]
  );
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
    <ScalarWidget
      label="Calories today:"
      value={projectedCalories}
      unit="kcal"
      className="col-span-3 sticky bottom-12"
    />
  );
}
