import { isBefore } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import { useRecoilValue } from "recoil";
import { personalInfoAtom } from "../atoms/PersonalInfoAtom";
import MeasurementDatabase, { MeasurementRecord } from "../database/MeasurementDatabase";
import { Gender, PersonalInfo, PhysicalActivityLevel } from "../types/PersonalInfo";
import * as PersonalInfoDomain from "../domain/PersonalInfo";

export const PALFactor: Record<PhysicalActivityLevel, number> = {
  [PhysicalActivityLevel.Sedentary]: 1.2,
  [PhysicalActivityLevel.LightlyActive]: 1.375,
  [PhysicalActivityLevel.ModeratelyActive]: 1.55,
  [PhysicalActivityLevel.VeryActive]: 1.725,
  [PhysicalActivityLevel.ExtremelyActive]: 1.9,
};


export const computeMaintenanceCaloriesOfDay = async (day: Date | number) => {
  const recordsOnDay = await MeasurementDatabase
    .measurements
    .where('name')
    .equalsIgnoreCase('weight')
    .and((record) => isBefore(record.date, day))
    .sortBy('date')

  const recentWeight = recordsOnDay[recordsOnDay.length - 1]?.value;
  if (!recentWeight) return null;
  const personalInfo = PersonalInfoDomain.get();
  return getMaintenanceCalories(recentWeight, personalInfo);
}

export const getMaintenanceCalories = (
  weight: number,
  personalInfo: PersonalInfo
) => {
  const { pal, height, gender, age } = personalInfo;
  const palFactor = PALFactor[pal];
  // Harris-Benedict BMR Equation
  if (gender === Gender.Male) {
    return palFactor * (88.4 + 13.4 * weight + 4.8 * height - 5.68 * age);
  } else {
    return palFactor * (447.6 + 9.25 * weight + 3.1 * height - 4.33 * age);
  }
};

export function useMaintenanceCalories(withCurrentWeight?: false): number | null;
export function useMaintenanceCalories(
  withCurrentWeight: true
): { maintenanceCalories: number; currentWeight: MeasurementRecord } | null;
export function useMaintenanceCalories(withCurrentWeight: any): any {
  const currentWeight = useLiveQuery(() =>
    MeasurementDatabase.lastRecordOfLabel("weight"),
    []
  );
  const personalInfo = useRecoilValue(personalInfoAtom);
  if (!currentWeight) return null;
  const maintenanceCalories = getMaintenanceCalories(currentWeight.value, personalInfo);
  return withCurrentWeight ? { maintenanceCalories, currentWeight: currentWeight } : maintenanceCalories;
}
