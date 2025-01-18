import { ChartData } from "chart.js";
import {
  MarcoNutrition,
  MarcoNutritionColor,
  NutritionCalories,
} from "../../types/Nutrition";
import DoughnutWidget from "./DoughnutWidget";

type Props = {
  caloriesByNutrition: NutritionCalories;
  remainingCalories: number;
};
export default function CalorieWidget({
  caloriesByNutrition,
  remainingCalories,
}: Props) {
  const doughnutChartData: ChartData<
    "doughnut",
    number[],
    MarcoNutrition | "Remaining nutrition"
  > = {
    labels: [...Object.values(MarcoNutrition), "Remaining nutrition"],
    datasets: [
      {
        label: "Daily nutrition",
        data: [
          ...Object.values(MarcoNutrition).map(
            (marco) => caloriesByNutrition[marco]
          ),
          remainingCalories,
        ],
        backgroundColor: [
          ...Object.values(MarcoNutrition).map(
            (marco) => MarcoNutritionColor[marco]
          ),
          "rgb(200, 200, 200)",
        ],
        borderWidth: 0,
        borderRadius: 1,
      },
    ],
  };

  return (
    <DoughnutWidget
      label="Marco distribution"
      className="relative overflow-hidden col-span-2 row-span-2 col-start-1"
      data={doughnutChartData}
    />
  );
}
