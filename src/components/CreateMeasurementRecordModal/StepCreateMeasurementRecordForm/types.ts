import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum CreateMeasurementStep {
  Name = 0,
  Unit = 1,
  Value = 2,
  Time = 3,
};

export const CreateMeasurementStepIconMap: Record<CreateMeasurementStep, IconProp> = {
  [CreateMeasurementStep.Name]: "tag",
  [CreateMeasurementStep.Unit]: "weight-hanging",
  [CreateMeasurementStep.Value]: "ruler",
  [CreateMeasurementStep.Time]: "clock",
}