import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import * as TargetCaloriesDomain from "../../domain/TargetCalories";
import ScalarWidget from "../Widgets/ScalarWidget";
import NutritionUtils from "../../utils/Nutrition";
import MeasurementDatabase from "../../database/MeasurementDatabase";
import { useRecoilValue } from "recoil";
import { personalInfoAtom } from "../../atoms/PersonalInfoAtom";
import { PersonalInfo } from "../../types/PersonalInfo";

const computeTotalDeficit = (
  currentWeight: number | null,
  personalInfo: PersonalInfo,
  previousConsumptions: ConsumptionRecord[]
) => {
  if (!currentWeight) return null;
  const maintenanceCalories = TargetCaloriesDomain.getMaintenanceCalories(
    currentWeight,
    personalInfo
  );
  const nutritionsFromConsumptions = previousConsumptions.map(
    NutritionUtils.nutritionFromConsumption
  );
  const totalNutritions = NutritionUtils.total(...nutritionsFromConsumptions);
  return {
    totalDeficit: maintenanceCalories * 7 - totalNutritions.calories,
    maintenanceCalories,
  };
};

export default function RollingDeficitWidget() {
  const previousConsumptions =
    useLiveQuery(() => ConsumptionDatabase.recordsInThisWeek()) ?? [];
  const personalInfo = useRecoilValue(personalInfoAtom);
  const currentWeight = useLiveQuery(() =>
    MeasurementDatabase.lastRecordOfLabel("weight")
  );

  const { totalDeficit, maintenanceCalories } =
    computeTotalDeficit(
      currentWeight?.value ?? null,
      personalInfo,
      previousConsumptions
    ) ?? {};

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
