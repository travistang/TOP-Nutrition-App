import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import { Option } from "../../../../Input/TabSelectInput";
import FoodTrackingModePickerOption from "./FoodTrackingModePickerOption";

type PickerType = FoodAmountTrackingType | null;
type Props = {
  className?: string;
  value: PickerType;
  onChange: (type: PickerType) => void;
};
const PICKER_OPTIONS: Option<PickerType>[] = [
  {
    text: "None",
    icon: "times",
    value: null,
  },
  {
    text: "Individual",
    icon: "box",
    value: FoodAmountTrackingType.Individual,
  },
  {
    text: "Simple",
    icon: "egg",
    value: FoodAmountTrackingType.Simple,
  },
  {
    text: "Individual and identical container",
    icon: "cubes-stacked",
    value: FoodAmountTrackingType.IdenticalIndividual,
  },
  {
    text: "In containers",
    icon: "boxes-stacked",
    value: FoodAmountTrackingType.Container,
  },
];

export default function FoodTrackingModePicker({
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <span className="col-span-full text-xs">Tracking type</span>
      {PICKER_OPTIONS.map((option) => (
        <FoodTrackingModePickerOption
          onSelect={() => onChange(option.value)}
          key={option.value}
          option={option}
          selected={option.value === value}
        />
      ))}
    </div>
  );
}
