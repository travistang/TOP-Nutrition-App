import { useTargetCalories } from "../../domain/TargetCalories";
import { CaloriesColor } from "../../types/Nutrition";
import ObjectUtils from '../../utils/Object';

export default function useTargetCaloriesChartData(startDate: Date | number, endDate: Date | number) {
  const targetCalories = useTargetCalories(startDate, endDate);
  const data = ObjectUtils.valueBySortedKey(targetCalories, (a, b) => a - b);
  return {
        label: "target calories",
        yAxisID: "calories",
        type: "line" as const,
        data,
        pointRadius: 0,
        borderColor: CaloriesColor,
    };
}