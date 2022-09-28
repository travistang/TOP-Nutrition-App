import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum CreateConsumptionStep {
  Name = 0,
  Nutrition = 1,
  Amount = 2,
  Date = 3,
};

export const CreateConsumptionStepIconMap: Record<CreateConsumptionStep, IconProp> = {
  [CreateConsumptionStep.Name]: "tag",
  [CreateConsumptionStep.Nutrition]: "pie-chart",
  [CreateConsumptionStep.Amount]: "weight-hanging",
  [CreateConsumptionStep.Date]: "clock",
};
