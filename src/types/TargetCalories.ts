
export enum TargetCaloriesType {
  Computed = 'computed',
  Default = 'default',
  Manual = 'manual'
}

export type TargetCalories = {
  id: string;
  date: number;
  value: number;
  type: TargetCaloriesType,
};

export enum TargetCaloriesConfigType {
  Constant = 'Manual',
  FromMaintenanceCalories = 'From maintenance calories',
};

export type ConstantTargetCaloriesConfig = {
  type: TargetCaloriesConfigType.Constant;
  value: number;
};

export type MaintenanceSurplusTargetCaloriesConfig = {
  type: TargetCaloriesConfigType.FromMaintenanceCalories;
  surplus: number;
}

export type TargetCaloriesConfig =
  | ConstantTargetCaloriesConfig
  | MaintenanceSurplusTargetCaloriesConfig;