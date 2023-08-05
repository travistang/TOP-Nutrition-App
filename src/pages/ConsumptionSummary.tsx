import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

import { withErrorBoundary } from "@sentry/react";
import classNames from "classnames";
import EmptyNotice from "../components/EmptyNotice";
import MealSummary from "../components/MealSummary";
import TargetCaloriesContextProvider from "../components/MealSummary/TargetCaloriesContext";
import SummaryWidgets from "../components/SummaryWidgets";
import ShortSummary from "../components/SummaryWidgets/ShortSummary";
import ConsumptionDatabase from "../database/ConsumptionDatabase";
import DateUtils from "../utils/Date";
import MealUtils from "../utils/Meal";
import NutritionUtils from "../utils/Nutrition";

type Props = {
  embedded?: boolean;
  date?: Date;
  className?: string;
};
function ConsumptionSummary({ className, embedded, date }: Props) {
  const [consumptionDate, setConsumptionDate] = useState(date ?? new Date());

  useEffect(() => {
    if (!date) {
      const focuslistener = () => {
        setConsumptionDate(new Date());
      };
      window.addEventListener("focus", focuslistener);
      return () => window.removeEventListener("focus", focuslistener);
    }
  }, [date]);

  useEffect(() => {
    setConsumptionDate(date ?? new Date());
  }, [date]);

  const consumptionsOfDay = useLiveQuery(
    () => ConsumptionDatabase.consumptionsOfDay(consumptionDate.getTime()),
    [consumptionDate]
  );
  const consumptionsByMeals = DateUtils.groupByTimeInterval(
    consumptionsOfDay ?? [],
    30
  );
  const nutritionRecords =
    consumptionsOfDay?.map(NutritionUtils.nutritionFromConsumption) ?? [];
  const totalCaloriesIntake = MealUtils.totalNutrition(
    consumptionsOfDay ?? []
  ).calories;

  return (
    <TargetCaloriesContextProvider date={consumptionDate}>
      <div
        className={classNames(
          "flex flex-col flex-1 gap-2 items-stretch",
          className
        )}
      >
        {embedded ? (
          <ShortSummary nutritionRecords={nutritionRecords} />
        ) : (
          <>
            <SummaryWidgets nutritionRecords={nutritionRecords} />
            <div className="flex flex-no-wrap pt-8 items-center text-xs gap-1 pb-2">
              <span>Meals today</span>
            </div>
          </>
        )}
        <div className="flex flex-col min-h-1/2 pb-16">
          {!embedded && !consumptionsOfDay?.length && (
            <EmptyNotice
              icon="hamburger"
              message="You haven't eatten anything yet today..."
            />
          )}
          {consumptionsByMeals?.map((meal, index) => (
            <MealSummary
              caloriesIntakeOfDay={totalCaloriesIntake}
              meal={meal}
              index={index}
              key={meal[0].id}
            />
          ))}
        </div>
      </div>
    </TargetCaloriesContextProvider>
  );
}

export default withErrorBoundary(ConsumptionSummary, {
  beforeCapture: (scope) => {
    scope.setTag("component", "ConsumptionSummary");
  },
});
