import classNames from "classnames";
import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import FoodTrackingModePickerOption from "./FoodTrackingModePickerOption";

type PickerType = FoodAmountTrackingType | null;
type Props = {
  className?: string;
  value: PickerType;
  onChange: (type: PickerType) => void;
};

const AVAILABLE_OPTIONS = [...Object.values(FoodAmountTrackingType), null];
export default function FoodTrackingModePicker({
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={classNames("grid grid-cols-2 gap-2", className)}>
      <span className="col-span-full text-xs">Select tracking type:</span>
      {AVAILABLE_OPTIONS.map((option) => (
        <FoodTrackingModePickerOption
          onSelect={() => onChange(option)}
          key={option}
          type={option ?? "none"}
          selected={option === value}
        />
      ))}
    </div>
  );
}
