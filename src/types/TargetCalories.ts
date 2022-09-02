
export enum TargetCaloriesType {
  Computed = 'computed',
  Manual = 'manual'
}

export type TargetCalories = {
  id: string;
  date: number;
  value: number;
  type: TargetCaloriesType,
};

export enum TargetCaloriesConfigType {
  Constant,
  FromMaintenanceCalories,
};

export type TargetCaloriesConfig = {
  type: TargetCaloriesConfigType.Constant;
  value: number;
} | {
  type: TargetCaloriesConfigType.FromMaintenanceCalories;
  measurementName: string;
  surplus: number;
}