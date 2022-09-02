import React from "react";
import { ChartData } from "chart.js";
import {
  MarcoNutrition,
  MarcoNutritionColor,
  NutritionCalories,
} from "../../types/Nutrition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
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

  const setDailyNutritionGoalAtom = useSetRecoilState(dailyNutritionGoalAtom);
  return (
    <DoughnutWidget
      label="Marco distribution"
      className="relative overflow-hidden col-span-2 row-span-2"
      data={doughnutChartData}>
      <FontAwesomeIcon
        onClick={() =>
          setDailyNutritionGoalAtom((atomValue) => ({
            ...atomValue,
            modalOpened: true,
          }))
        }
        icon="trophy"
        className="rounded-full p-1 bg-gray-400 h-2 w-2 self-end"
      />
    </DoughnutWidget>
  );
}
