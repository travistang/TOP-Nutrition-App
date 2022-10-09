import { Measurement } from "../../../types/Measurement";
import { ProgressiveFormStep } from "../../ProgressiveForm/context";
import MeasurementNameForm from "./MeasurementNameForm";
import MeasurementTimeForm from "./MeasurementTimeForm";
import { CreateMeasurementStep, CreateMeasurementStepIconMap } from "./types";
import UnitForm from "./UnitForm";
import ValueForm from "./ValueForm";

export const FormComponentMap: Record<CreateMeasurementStep, React.FC<any>> = {
  [CreateMeasurementStep.Name]: MeasurementNameForm,
  [CreateMeasurementStep.Unit]: UnitForm,
  [CreateMeasurementStep.Value]: ValueForm,
  [CreateMeasurementStep.Time]: MeasurementTimeForm,
};

export const steps: ProgressiveFormStep[] = Object.values(CreateMeasurementStep)
  .filter((n) => !Number.isNaN(parseInt(n as string)))
  .map((step) => ({
    icon: CreateMeasurementStepIconMap[step as CreateMeasurementStep],
    formComponent: FormComponentMap[step as CreateMeasurementStep],
    key: step.toString(),
  }));

export const getNextStep = (step: number, measurementRecord: Measurement): number | null => {
  switch (step) {
    case CreateMeasurementStep.Name:
      if (!measurementRecord.name) return null;
      return CreateMeasurementStep.Unit;
    case CreateMeasurementStep.Unit:
      if (!measurementRecord.unit) return null;
      return CreateMeasurementStep.Value;
    default:
      return step + 1;
  }
}