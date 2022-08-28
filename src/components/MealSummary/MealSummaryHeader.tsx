import { format } from "date-fns";
import React from "react";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import NumberUtils from "../../utils/Number";
import MealUtils from "../../utils/Meal";
import { splitMealModalAtom } from "../../atoms/SplitMealModalAtom";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import Chip from "../Chip";
import MealSummaryProgressBar from "./MealSummaryProgressBar";

type Props = {
  meal: ConsumptionRecord[];
  index: number;
  caloriesIntakeOfDay: number;
};
export default function MealSummaryHeader({
  meal,
  index,
  caloriesIntakeOfDay,
}: Props) {
  const setSplitMealModal = useSetRecoilState(splitMealModalAtom);

  const mealNutrition = MealUtils.totalNutrition(meal);
  const mealCalories = mealNutrition.calories;

  const caloriesRatioAgainstTotal = mealCalories / caloriesIntakeOfDay;

  const openSplitMealModal = () => {
    setSplitMealModal({ modalOpened: true, meal });
  };

  return (
    <div className="flex-shrink-0 sticky top-0 rounded-t-lg h-14 grid grid-cols-6 gap-1 items-center bg-gray-300 shadow-md -mx-2 px-2">
      <div className="flex flex-col col-span-4">
        <span className="text-gray-500 text-xs">
          <b>Meal {index + 1}</b> | {format(meal[0].date, "HH:mm")} |{" "}
          {NumberUtils.ratioToPercentageString(caloriesRatioAgainstTotal)} daily
        </span>
        <div className="grid grid-cols-12 w-full gap-1">
          {Object.values(MarcoNutrition).map((marco) => (
            <Chip
              className="text-xs col-span-3 flex items-center justify-center text-gray-200"
              color={MarcoNutritionColor[marco]}
              text={`${mealNutrition[marco].toFixed(1)}g`}
            />
          ))}
          <MealSummaryProgressBar mealNutrition={mealNutrition} />
        </div>
      </div>
      <div className="flex items-center gap-1 col-span-2 justify-end">
        <Chip
          text={`${mealCalories.toFixed(1)} kcal`}
          color={MarcoNutritionColor.protein}
          className="h-6 items-center flex text-gray-100 text-xs px-1 flex-1 justify-center"
        />
        <FontAwesomeIcon
          onClick={openSplitMealModal}
          icon="pen"
          className="h-2 w-2 rounded-full p-2 bg-gray-400"
        />
      </div>
    </div>
  );
}
