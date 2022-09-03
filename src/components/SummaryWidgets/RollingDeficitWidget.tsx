import { subDays, eachDayOfInterval, endOfDay, isSameDay } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import TargetCaloriesDatabase from "../../database/TargetCaloriesDatabase";
import ScalarWidget from "../Widgets/ScalarWidget";
import ArrayUtils from "../../utils/Array";
import NutritionUtils from "../../utils/Nutrition";
import Dexie from "dexie";

export default function RollingDeficitWidget() {
  const now = new Date();
  const startDate = subDays(now, 7);
  const eachPreviousDays = eachDayOfInterval({
    start: startDate,
    end: endOfDay(now),
  });

  const targetCaloriesPreviousDays =
    useLiveQuery(() => {
      return TargetCaloriesDatabase.getTargetCaloriesInRange(startDate, now);
    }, [startDate]) ?? [];

  const previousConsumptions =
    useLiveQuery(async () => {
      const consumptions = await Dexie.Promise.all(
        eachPreviousDays.map((day) =>
          ConsumptionDatabase.consumptionsOfDay(day.getTime())
        )
      );
      return consumptions.flat();
    }, [eachPreviousDays]) ?? [];

  const consumptionsTargetCaloriesPair = ArrayUtils.zipBy(
    targetCaloriesPreviousDays,
    previousConsumptions,
    (targetCalories, consumption) =>
      isSameDay(targetCalories.date, consumption.date)
  );

  const targetCaloriesActualCaloriesPair = consumptionsTargetCaloriesPair.map(
    ([target, consumptions]) =>
      [
        target,
        NutritionUtils.totalCalories(
          NutritionUtils.total(
            ...consumptions.map(NutritionUtils.nutritionFromConsumption)
          )
        ),
      ] as const
  );

  const totalDifference = targetCaloriesActualCaloriesPair.reduce(
    (deficit, [target, actual]) => deficit + target.value - actual,
    0
  );
  return (
    <ScalarWidget
      value={Math.round(totalDifference)}
      label="7 Day total deficit"
      className="col-span-3 row-span-1"
      unit="kcal"
    />
  );
}
