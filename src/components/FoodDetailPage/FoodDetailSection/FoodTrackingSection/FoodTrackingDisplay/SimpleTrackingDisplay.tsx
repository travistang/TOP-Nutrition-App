import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import TextWithUnit from "../../../../TextWithUnit";

type SimpleTracking =
  | FoodTrackingWithType<FoodAmountTrackingType.Simple>
  | FoodTrackingWithType<FoodAmountTrackingType.Individual>;
type Props = {
  className?: string;
  tracking: SimpleTracking;
};
const displayConfig: Record<
  FoodAmountTrackingType.Simple | FoodAmountTrackingType.Individual,
  {
    unit: string;
    label: string;
    integer?: boolean;
  }
> = {
  [FoodAmountTrackingType.Individual]: {
    unit: "",
    label: "Unit(s) left",
    integer: true,
  },
  [FoodAmountTrackingType.Simple]: {
    unit: "g",
    label: "Remaining amount",
  },
};
export default function SimpleTrackingDisplay({ tracking }: Props) {
  const { unit, label, integer } = displayConfig[tracking.type];
  return (
    <div className="flex items-end gap-2 flex-nowrap">
      <TextWithUnit
        unit={unit}
        value={tracking.amount}
        integer={integer}
        size="xl"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
