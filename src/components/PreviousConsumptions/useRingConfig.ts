import { endOfMonth, format } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import { Duration } from "../../types/Duration";
import ArrayUtils from "../../utils/Array";
import ObjectUtils from "../../utils/Object";
import NutritionUtils from "../../utils/Nutrition";
import { MarcoNutrition, MarcoNutritionColor } from "../../types/Nutrition";
import { RingConfig } from "../Calendar/Ring";

export default function useRingConfig(month: Date | number) {
  const consumptionsOfMonth = useLiveQuery(() => {
    return ConsumptionDatabase.recordsInRange(endOfMonth(month), Duration.OneMonth);
  }, [month]);

  const consumptionsByDates = ArrayUtils.groupBy(
    consumptionsOfMonth ?? [],
    (consumption) => format(consumption.date, "dd/MM/yyyy")
  );

  const nutritionsByDates = ObjectUtils.mapValues(consumptionsByDates, records => {
    const nutritionOfDay = NutritionUtils.total(
      ...records.map(NutritionUtils.nutritionFromConsumption)
    );
    return Object.values(MarcoNutrition).map(marco => ({
      color: MarcoNutritionColor[marco],
      value: nutritionOfDay[marco],
    })) as RingConfig;

  });

  return nutritionsByDates;
}