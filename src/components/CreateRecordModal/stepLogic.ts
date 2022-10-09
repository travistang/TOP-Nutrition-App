import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import { CreateEditType } from "../../types/utils";
import { CreateConsumptionStep } from "./StepCreateConsumptionRecordForm/types";

export const getNextStep = (
  step: number,
  record: CreateEditType<ConsumptionRecord>
) => {
  switch (step) {
    case CreateConsumptionStep.Name:
      if (record.name.trim().length === 0) return null;
      return CreateConsumptionStep.Nutrition;
    case CreateConsumptionStep.Amount:
      if (!record.amount) return null;
      return CreateConsumptionStep.Date;
    default:
      return step + 1;
  }
};