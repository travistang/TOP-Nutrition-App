import { eachDayOfInterval, endOfDay, startOfDay, subMonths } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import {
  TargetCaloriesConfig,
  TargetCaloriesConfigType,
} from "../types/TargetCalories";
import * as DailyNutritionGoalAtom from '../atoms/DailyNutritionGoalAtom';
import * as MaintenanceCaloriesDomain from '../domain/MaintenanceCalories';
import MeasurementDatabase, { MeasurementRecord } from "../database/MeasurementDatabase";
import NumberUtils from '../utils/Number';
import StringUtils from '../utils/String';
import ObjectUtils from '../utils/Object';
import DateUtils from '../utils/Date';
import { PersonalInfo } from "../types/PersonalInfo";
import { useRecoilValue } from "recoil";
import { personalInfoAtom } from "../atoms/PersonalInfoAtom";

export const DEFAULT_TARGET_CALORIES = 2500;
export const DEFAULT_CONFIG: TargetCaloriesConfig = {
  type: TargetCaloriesConfigType.Constant,
  value: DEFAULT_TARGET_CALORIES,
};

export const computeTargetCalories = (
  weight: number,
  personalInfo: PersonalInfo,
) => {
  const nutritionGoal = DailyNutritionGoalAtom.getStoredValue();
  const { targetCaloriesConfig: config } = nutritionGoal;
  const maintenanceCalories = MaintenanceCaloriesDomain.getMaintenanceCalories(
    weight,
    personalInfo,
  );

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
};

export function useTargetCalories(startTime: Date | number, endTime: Date | number) {
  const personalInfo = useRecoilValue(personalInfoAtom);
  const daysInInterval = eachDayOfInterval({ start: startTime, end: endTime });
  const weightRecordsInPeriod = useLiveQuery(() =>
    MeasurementDatabase.measurements
      .where("date")
      .between(
        startOfDay(subMonths(startTime, 1)).getTime(),
        endOfDay(endTime).getTime())
      .filter((record) => StringUtils.caseInsensitiveEqual(record.name, 'weight'))
      .toArray(),
    [startTime, endTime]
  ) ?? [];

  const weightRecordsByDays: Record<number, MeasurementRecord[]> =
    Object.fromEntries(
      daysInInterval.map((day) => [
        day,
        DateUtils.getMostRecentRecords(weightRecordsInPeriod, day),
      ])
    );

  const targetCaloriesByDay = ObjectUtils.mapValues(
    weightRecordsByDays,
    (records) => {
      if (records.length === 0) return null;
      const averageWeight = NumberUtils.average(...records.map(record => record.value));
      return computeTargetCalories(averageWeight, personalInfo);
    }
  );

  return targetCaloriesByDay;
};