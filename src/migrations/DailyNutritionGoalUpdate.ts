import Dexie from 'dexie';
import { addDays, eachDayOfInterval, format, isSameDay, startOfDay } from 'date-fns';
import { DailyNutritionGoal, DEFAULT_NUTRITION_GOAL, LS_DAILY_NUTRITION_GOAL_KEY } from '../atoms/DailyNutritionGoalAtom';
import { TargetCalories, TargetCaloriesConfigType, TargetCaloriesType } from '../types/TargetCalories';
import LocalStorageUtils from '../utils/LocalStorage';
import TargetCaloriesDatabase from '../database/TargetCaloriesDatabase';
import * as MaintenanceCaloriesDomain from '../domain/MaintenanceCalories';
import * as TargetCaloriesDomain from '../domain/TargetCalories';

const migrateLocalStoreStructure = async () => {
  const setStore = (obj: any) => LocalStorageUtils.setStore(LS_DAILY_NUTRITION_GOAL_KEY, obj);
  const currentLocalStoreValue =
    LocalStorageUtils.getFromStore(LS_DAILY_NUTRITION_GOAL_KEY);
  if (!currentLocalStoreValue) {
    setStore(DEFAULT_NUTRITION_GOAL);
    return;
  }

  if (currentLocalStoreValue.targetCalories) {
    const newConfig: DailyNutritionGoal = { ...DEFAULT_NUTRITION_GOAL };
    if (currentLocalStoreValue.targetNutritionIntake) {
      newConfig.targetNutritionIntake = currentLocalStoreValue.targetNutritionIntake;
    }
    if (currentLocalStoreValue.targetCalories && !currentLocalStoreValue.targetCaloriesConfig) {
      newConfig.targetCaloriesConfig = {
        type: TargetCaloriesConfigType.Constant,
        value: currentLocalStoreValue.targetCalories,
      }
    }

    setStore(newConfig);
  }
}

const getTargetCaloriesAndType = (day: Date, targetCaloriesInInterval: TargetCalories[]) => {
  return new Dexie.Promise<{
    targetCalories: number;
    targetCaloriesType: TargetCaloriesType;
    currentTargetCalories: TargetCalories | undefined;
  }>(async (resolve) => {
    const maintenanceCalories =
      await MaintenanceCaloriesDomain.computeMaintenanceCaloriesOfDay(day);
    const targetCalories = maintenanceCalories
      ? await TargetCaloriesDomain.computeTargetCaloriesOfDay(
          maintenanceCalories,
          day
        )
      : TargetCaloriesDomain.DEFAULT_TARGET_CALORIES;
    const currentTargetCalories = targetCaloriesInInterval.find((target) =>
      isSameDay(target.date, day)
    );
    const targetCaloriesType = maintenanceCalories
      ? TargetCaloriesType.Computed
      : TargetCaloriesType.Default;

    resolve({ targetCalories, targetCaloriesType, currentTargetCalories });
  });
}
const populateDailyCaloriesConfig = async () => {
  const now = startOfDay(Date.now());
  const weekLater = addDays(now, 7);
  const daysThisWeek = eachDayOfInterval({ start: now, end: weekLater });
  const targetCaloriesInInterval = await TargetCaloriesDatabase.getTargetCaloriesInRange(now, weekLater);
   for (const day of daysThisWeek) {
      console.log(`Running migrations on date ${format(day, 'dd/MM/yyyy')}`);
      const {
        currentTargetCalories,
        targetCalories,
        targetCaloriesType
      } = await getTargetCaloriesAndType(
        day,
        targetCaloriesInInterval
      );
      if (!currentTargetCalories) {
        await TargetCaloriesDatabase.addTargetCalories({
          date: day.getTime(),
          value: targetCalories,
          type: targetCaloriesType,
        });
      } else {
        await TargetCaloriesDatabase.editTargetCalories(
          currentTargetCalories.id,
          {
            type: targetCaloriesType,
            value: targetCalories,
          }
        );
      }
    }
    console.log("population done");
};


export default async function run() {
  await migrateLocalStoreStructure();
  await populateDailyCaloriesConfig();
}