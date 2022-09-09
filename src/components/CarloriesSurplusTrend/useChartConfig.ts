import { format, isSameDay } from "date-fns";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { MarcoNutritionColor } from "../../types/Nutrition";
import ArrayUtils from "../../utils/Array";
import NutritionUtils from "../../utils/Nutrition";
import ObjectUtils from "../../utils/Object";

export default function useChartConfig(
  targetCalories: Record<number, number | null>,
  recordsInDuration: ConsumptionRecord[] | undefined,
  eachDaysInDuration: Date[],
) {
    const recordsByDay: [number, ConsumptionRecord[]][] = ArrayUtils.zipBy(
      eachDaysInDuration.map((d) => d.getTime()),
      recordsInDuration ?? [],
      (day, record) => isSameDay(day, record.date)
    );

    const caloriesSurplusByDay = recordsByDay
      .map(([date, records]) => {
        const target = ObjectUtils.findByKey(targetCalories, (key) =>
          isSameDay(new Date(key), date)
        );
        if (!target) return [date, null] as const;
        const surplus =
          NutritionUtils.total(
            ...records.map(NutritionUtils.nutritionFromConsumption)
          ).calories - target;
        return [date, surplus] as const;
      })
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v);

    const caloriesDeficitData = caloriesSurplusByDay.map(surplus => surplus && surplus < 0 ? surplus : null);
    const caloriesSurplusData = caloriesSurplusByDay.map(surplus => surplus && surplus > 0 ? surplus : null);

  return {
    labels: eachDaysInDuration.map((day) => format(day, "dd/MM")),
    datasets: [
      {
        label: "surplus",
        type: "bar" as const,
        data: caloriesSurplusData,
        backgroundColor: MarcoNutritionColor.carbohydrates,
      },
      {
        label: "deficit",
        type: "bar" as const,
        data: caloriesDeficitData,
        backgroundColor: MarcoNutritionColor.fat,
      },
    ],
  };
}