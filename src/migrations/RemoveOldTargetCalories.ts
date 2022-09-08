import { subMonths } from "date-fns";
import TargetCaloriesDatabase from "../database/TargetCaloriesDatabase";


export default async function run() {
  TargetCaloriesDatabase.transaction('rw', TargetCaloriesDatabase.targetCalories, async () => {
    await TargetCaloriesDatabase.targetCalories
      .where('date')
      .belowOrEqual(subMonths(Date.now(), 3).getTime())
      .delete();
  });
}