import { format, max, min } from "date-fns";

import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { Measurement } from "../../types/Measurement";
import useTargetCaloriesChartData from "./useTargetCaloriesChartData";
import measurementDataSource from "./dataSources/measurements";
import nutritionDataSource from "./dataSources/nutrition";


type Props = {
  eachDaysInDuration: Date[];
  records: ConsumptionRecord[];
  measurements: Measurement[];
};



export default function useChartConfig({
  records,
  eachDaysInDuration,
  measurements,
}: Props) {
  const targetCaloriesChartData = useTargetCaloriesChartData(
    min(eachDaysInDuration),
    max(eachDaysInDuration)
  );

  const [measurementData, options] = measurementDataSource(
    measurements,
    eachDaysInDuration
  );
  const marcoNutritionsData = nutritionDataSource(records, eachDaysInDuration);
  const consumptionTrendData = {
    labels: eachDaysInDuration.map((day) => format(day, "dd/MM")),
    datasets: [
      measurementData,
      targetCaloriesChartData,
      ...marcoNutritionsData,
    ],
  };

  return {
    data: consumptionTrendData,
    options,
  };
}
