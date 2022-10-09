import React from "react";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { createEditRecordAtom } from "../../../atoms/CreateEditRecordAtom";
import { ProgressiveFormConfig, ProgressiveFormContextValue, ProgressiveFormStep } from "../../ProgressiveForm/context";
import { CreateConsumptionStep, CreateConsumptionStepIconMap } from "./types";
import ProgressiveForm from "../../ProgressiveForm";
import ConsumptionNameForm from "./ConsumptionNameForm";
import ConsumptionDatabase, { ConsumptionRecord } from "../../../database/ConsumptionDatabase";
import NutritionForm from "./NutritionForm";
import WeightForm from "./WeightForm";
import ConsumptionTimeForm from "./ConsumptionTimeForm";
import { DEFAULT_CONSUMPTION } from "../../../types/Consumption";
import ConsumptionPreview from "./ConsumptionPreview";
import { getNextStep } from "../stepLogic";

const FormComponentMap: Record<CreateConsumptionStep, React.FC> = {
  [CreateConsumptionStep.Name]: ConsumptionNameForm,
  [CreateConsumptionStep.Nutrition]: NutritionForm,
  [CreateConsumptionStep.Amount]: WeightForm,
  [CreateConsumptionStep.Date]: ConsumptionTimeForm,
}

const steps: ProgressiveFormStep[] = Object.values(CreateConsumptionStep)
  .filter((v) => !Number.isNaN(parseInt(v.toString())))
  .map((step) => ({
    icon: CreateConsumptionStepIconMap[step as CreateConsumptionStep],
    formComponent: FormComponentMap[step as CreateConsumptionStep],
    key: step.toString(),
  }));

export default function StepCreateConsumptionRecordForm() {
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(
    createEditRecordAtom
  );
  const { record } = consumptionRecord;
  const isEditing = !!consumptionRecord.record.id;
  const closeModal = () => setConsumptionRecord(value => ({ ...value, openingSource: null }));

  const onSubmit = async (contextValue: ProgressiveFormContextValue) => {
    const { restartOnComplete } = contextValue;
    if (isEditing) {
      await ConsumptionDatabase.edit(record.id!, record as ConsumptionRecord);
      toast.success("Record updated");
      closeModal();
    } else {
      await ConsumptionDatabase.add(record);
      toast.success("Record added");
      if (!restartOnComplete) {
        closeModal();
      }
    }
  };

  const onRestart = () => {
    setConsumptionRecord((atom) => ({
      ...atom,
      record: { ...DEFAULT_CONSUMPTION, date: atom.record.date }
    }));
  };

  const progressiveFormConfig: ProgressiveFormConfig = {
    steps,
    onSubmit,
    onRestart,
    nextStep: (step) => getNextStep(step, record),
  }

  return (
    <ProgressiveForm
      config={progressiveFormConfig}
      initialStep={isEditing ? CreateConsumptionStep.Amount : CreateConsumptionStep.Name}
    >
      <ConsumptionPreview record={record} onClose={closeModal} />
    </ProgressiveForm>
  )
}