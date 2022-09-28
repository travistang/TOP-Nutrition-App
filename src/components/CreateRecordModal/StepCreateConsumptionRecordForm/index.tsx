import React from "react";
import { useRecoilState } from "recoil";
import { createEditRecordAtom } from "../../../atoms/CreateEditRecordAtom";
import { ProgressiveFormConfig, ProgressiveFormStep } from "../../ProgressiveForm/context";
import { CreateConsumptionStep, CreateConsumptionStepIconMap } from "./types";
import EnumUtils from '../../../utils/Enum';
import ProgressiveForm from "../../ProgressiveForm";
import ConsumptionNameForm from "./ConsumptionNameForm";

const FormComponentMap: Record<CreateConsumptionStep, React.FC> = {
  [CreateConsumptionStep.Name]: ConsumptionNameForm,
  [CreateConsumptionStep.Nutrition]: () => null,
  [CreateConsumptionStep.Amount]: () => null,
  [CreateConsumptionStep.Date]: () => null,
}

const steps: ProgressiveFormStep[] = EnumUtils
  .numberEnumValues(CreateConsumptionStep)
  .map((step) => ({
    icon: CreateConsumptionStepIconMap[step as CreateConsumptionStep],
    formComponent: FormComponentMap[step as CreateConsumptionStep],
    key: step.toString(),
  }));

export default function CreateRecordModal() {
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(
    createEditRecordAtom
  );

  const closeModal = () => setConsumptionRecord(value => ({ ...value, modalOpened: false }));

  const progressiveFormConfig: ProgressiveFormConfig = {
    steps,
    onSubmit: console.log,
    // TODO: change this
    nextStep: (step) => step + 1,
  }

  return (
    <ProgressiveForm config={progressiveFormConfig}>
      WIP {/* TODO: preview calories deficit and food item */}
    </ProgressiveForm>
  )
}