import { useLiveQuery } from "dexie-react-hooks";
import { useRecoilValue } from "recoil";
import { personalInfoAtom } from "../atoms/PersonalInfoAtom";
import MeasurementDatabase from "../database/MeasurementDatabase";
import { Gender, PersonalInfo } from "../types/PersonalInfo";
import { PALFactor } from "./TargetCalories";

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

export function useMaintenanceCalories() {
  const currentWeight = useLiveQuery(() =>
    MeasurementDatabase.lastRecordOfLabel("weight")
  );
  const personalInfo = useRecoilValue(personalInfoAtom);
  if (!currentWeight) return null;
  return getMaintenanceCalories(currentWeight?.value, personalInfo);
}
