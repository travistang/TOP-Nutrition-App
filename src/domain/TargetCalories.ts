import { PhysicalActivityLevel } from "../types/PersonalInfo";
import {
  TargetCaloriesConfig,
  TargetCaloriesConfigType,
} from "../types/TargetCalories";

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
  maintenanceCalories?: number,
  date?: Date | number,
): Promise<number> => {
  const config = getStoredConfig();
  switch (config.type) {
    case TargetCaloriesConfigType.Constant:
      return config.value;
    case TargetCaloriesConfigType.FromMaintenanceCalories:
      if (!maintenanceCalories) return DEFAULT_TARGET_CALORIES;
      return maintenanceCalories + config.surplus;
  }
};

export const getDefaultTargetCaloriesConfig = (type: TargetCaloriesConfigType): TargetCaloriesConfig => {
  switch (type) {
    case TargetCaloriesConfigType.Constant:
      return {
        type: TargetCaloriesConfigType.Constant,
        value: DEFAULT_TARGET_CALORIES,
      };
    case TargetCaloriesConfigType.FromMaintenanceCalories:
      return {
        type: TargetCaloriesConfigType.FromMaintenanceCalories,
        surplus: DEFAULT_TARGET_CALORIES,
      };
  }
}