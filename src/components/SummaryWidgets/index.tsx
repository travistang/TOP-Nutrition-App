import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRecoilState } from "recoil";
import { dailyNutritionGoalAtom } from "../../atoms/DailyNutritionGoalAtom";
import {
  MarcoNutrition,
  MarcoNutritionColor,
  Nutrition,
} from "../../types/Nutrition";
import NutritionUtils from "../../utils/Nutrition";
import CalorieWidget from "./CalorieWidget";
import ItemWidget from "./ItemWidget";

type Props = {
  embedded?: boolean;
  nutritionRecords: Nutrition[];
};
export default function SummaryWidgets({ embedded, nutritionRecords }: Props) {
  const [{ targetCalories, targetNutritionIntake }, setDailyNutritionGoalAtom] =
    useRecoilState(dailyNutritionGoalAtom);
  const totalNutritions = NutritionUtils.total(...nutritionRecords);
  const caloriesByNutrition =
    NutritionUtils.caloriesByNutrition(totalNutritions);

  return (
    <div className="flex flex-row flex-nowrap gap-2 rounded-lg p-2 bg-gray-300">
      <CalorieWidget
        caloriesByNutrition={caloriesByNutrition}
        remainingCalories={Math.max(
          0,
          targetCalories - totalNutritions.calories
        )}
      />
      <div className="flex-1 flex flex-col items-stretch gap-1">
        {!embedded && (
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
        )}
        <ItemWidget
          name="Calories"
          value={totalNutritions.calories}
          maxValue={targetCalories}
          unit="kcal"
          themeColor="rgb(100, 0, 0)"
          className=""
        />
        {Object.values(MarcoNutrition).map((marco) => (
          <ItemWidget
            key={marco}
            name={marco}
            value={totalNutritions[marco]}
            maxValue={targetNutritionIntake[marco]}
            unit="g"
            themeColor={MarcoNutritionColor[marco]}
          />
        ))}
      </div>
    </div>
  );
}
