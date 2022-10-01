import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";
import { MarcoNutrition, MarcoNutritionColor } from "../../../types/Nutrition";
import NutritionUtils from "../../../utils/Nutrition";
import DateUtils from "../../../utils/Date";

const createCaloriesChartData = (
  records: ConsumptionRecord[],
  eachDaysInDuration: Date[]
) => {
  const recordsGroupedByDay = DateUtils.groupRecordsByDates(
    records,
    eachDaysInDuration
  );
  const recordsByDay = DateUtils.orderedRecordGroups(recordsGroupedByDay);

  const caloriesByNutritionByDay = recordsByDay.map((dailyRecords) =>
    NutritionUtils.caloriesByNutrition(
      NutritionUtils.total(
        ...dailyRecords.map((record) =>
          NutritionUtils.nutritionFromConsumption(record)
        )
      )
    )
  );
  return Object.values(MarcoNutrition).map((marco) => ({
    label: marco,
    type: "bar" as const,
    yAxisID: "calories",
    data: caloriesByNutritionByDay.map(
      (caloriesByNutrition) => caloriesByNutrition[marco]
    ),
    backgroundColor: MarcoNutritionColor[marco],
  }));
};

export default createCaloriesChartData;
