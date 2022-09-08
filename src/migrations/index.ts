import DailyNutritionGoalUpdateMigration from './DailyNutritionGoalUpdate';
import RemoveOldTargetCaloriesMigration from './RemoveOldTargetCalories';

export default async function run() {
  const registeredMigrations = [
    DailyNutritionGoalUpdateMigration,
    RemoveOldTargetCaloriesMigration,
  ];

  try {
    for (const migrate of registeredMigrations) {
      await migrate();
    }
  } catch(e) {
    console.error("Failed to run migration");
    console.log(e);
    return;
  }
}