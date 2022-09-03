import MeasurementDatabase from "../database/MeasurementDatabase";
import {
  Gender,
  PersonalInfo,
  PhysicalActivityLevel,
} from "../types/PersonalInfo";
import {
  TargetCaloriesConfig,
  TargetCaloriesConfigType,
} from "../types/TargetCalories";
import * as PersonalInfoDomain from "./PersonalInfo";

export const DEFAULT_TARGET_CALORIES = 2500;
export const LS_TARGET_CALORIES_KEY = "@nutritionApp/TargetCalories";
export const DEFAULT_CONFIG: TargetCaloriesConfig = {
  type: TargetCaloriesConfigType.Constant,
  value: 2500,
};
export const PALFactor: Record<PhysicalActivityLevel, number> = {
  [PhysicalActivityLevel.Sedentary]: 1.2,
  [PhysicalActivityLevel.LightlyActive]: 1.375,
  [PhysicalActivityLevel.ModeratelyActive]: 1.55,
  [PhysicalActivityLevel.VeryActive]: 1.725,
  [PhysicalActivityLevel.ExtremelyActive]: 1.9,
};

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

export const setStoredConfig = (config: TargetCaloriesConfig) => {
  localStorage.setItem(LS_TARGET_CALORIES_KEY, JSON.stringify(config));
};

const validateConfig = (config: { [key: string]: any }) => {
  if (!Object.values(TargetCaloriesConfigType).includes(config.type))
    return false;
  const calorieConfig = config as TargetCaloriesConfig;
  switch (calorieConfig.type) {
    case TargetCaloriesConfigType.Constant:
      return config.value > 0;
    case TargetCaloriesConfigType.FromMaintenanceCalories:
      return true;
    default:
      return false;
  }
};
export const getStoredConfig = (): TargetCaloriesConfig => {
  const storedConfig = localStorage.getItem(LS_TARGET_CALORIES_KEY) ?? "";
  try {
    const config = JSON.parse(storedConfig);
    if (!validateConfig(config)) throw new Error("Invalid config");
    return config;
  } catch {
    setStoredConfig(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }
};
export const computeTargetCaloriesOfDay = async (
  date = Date.now()
): Promise<number> => {
  const config = getStoredConfig();
  switch (config.type) {
    case TargetCaloriesConfigType.Constant:
      return config.value;
    case TargetCaloriesConfigType.FromMaintenanceCalories:
      const currentWeightMeasurement =
        await MeasurementDatabase.lastRecordOfLabel(config.measurementName);
      const personalInfo = PersonalInfoDomain.get();
      if (!currentWeightMeasurement || !personalInfo)
        return DEFAULT_TARGET_CALORIES;
      const currentWeight = currentWeightMeasurement.value;
      const maintenanceCalories = getMaintenanceCalories(
        currentWeight,
        personalInfo
      );
      return maintenanceCalories + config.surplus;
  }
};
