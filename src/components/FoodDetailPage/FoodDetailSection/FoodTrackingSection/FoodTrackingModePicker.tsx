import { FoodAmountTrackingType } from "../../../../types/FoodAmountTracking";
import TabSelectInput, { Option } from "../../../Input/TabSelectInput";

type PickerType = FoodAmountTrackingType | null;
type Props = {
  className?: string;
  value: PickerType;
  onChange: (type: PickerType) => void;
};
const PICKER_OPTIONS: Option<PickerType>[] = [
  {
    text: "None",
    value: null,
  },
  {
    text: "Individual",
    value: FoodAmountTrackingType.Individual,
  },
  {
    text: "Simple",
    value: FoodAmountTrackingType.Simple,
  },
  {
    text: "Individual and identical container",
    value: FoodAmountTrackingType.IdenticalIndividual,
  },
  {
    text: "In containers",
    value: FoodAmountTrackingType.Container,
  },
];

export default function FoodTrackingModePicker({
  value,
  onChange,
  className,
}: Props) {
  return (
    <TabSelectInput
      options={PICKER_OPTIONS}
      selected={value}
      onSelect={onChange}
      className={className}
      label="Tracking mode"
    />
  );
}
