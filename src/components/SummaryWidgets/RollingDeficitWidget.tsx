import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import ScalarWidget from "../Widgets/ScalarWidget";
import NutritionUtils from "../../utils/Nutrition";

const computeTotalDeficit = (
  maintenanceCalories: number,
  previousConsumptions: ConsumptionRecord[]
) => {
  const nutritionsFromConsumptions = previousConsumptions.map(
    NutritionUtils.nutritionFromConsumption
  );
  const totalNutritions = NutritionUtils.total(...nutritionsFromConsumptions);
  return maintenanceCalories * 7 - totalNutritions.calories;
};

type Props = {
  maintenanceCalories: number | null;
};
export default function RollingDeficitWidget({ maintenanceCalories }: Props) {
  const previousConsumptions =
    useLiveQuery(() => ConsumptionDatabase.recordsInThisWeek()) ?? [];
  const totalDeficit = maintenanceCalories
    ? computeTotalDeficit(maintenanceCalories, previousConsumptions)
    : null;
  return (
    <ScalarWidget
      value={totalDeficit ? Math.round(totalDeficit) : null}
      label="7 Day total deficit"
      className="col-span-3 row-span-1"
      extraInfo={
        maintenanceCalories
          ? `Maintenance: ${Math.round(maintenanceCalories)} kcal`
          : "missing weight measurement"
      }
      unit="kcal"
    />
  );
}
