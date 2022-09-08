import { TargetCaloriesConfig } from "../../types/TargetCalories";

export type TargetCaloriesFormProps = {
  targetCaloriesConfigPlaceholder: TargetCaloriesConfig;
  onUpdatePlaceholder: (config: TargetCaloriesConfig) => void;
}