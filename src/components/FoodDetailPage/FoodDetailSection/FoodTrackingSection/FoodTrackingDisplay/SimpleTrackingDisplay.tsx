import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import ProgressBar from "../../../../ProgressBar";
import TextWithUnit from "../../../../TextWithUnit";

type SimpleTracking =
  | FoodTrackingWithType<FoodAmountTrackingType.Simple>
  | FoodTrackingWithType<FoodAmountTrackingType.IdenticalIndividual>
  | FoodTrackingWithType<FoodAmountTrackingType.Individual>;
type Props = {
  className?: string;
  tracking: SimpleTracking;
};
const displayConfig: Record<
  | FoodAmountTrackingType.Simple
  | FoodAmountTrackingType.Individual
  | FoodAmountTrackingType.IdenticalIndividual,
  {
    unit: string;
    label: string;
    integer?: boolean;
  }
> = {
  [FoodAmountTrackingType.IdenticalIndividual]: {
    unit: "",
    label: "Unit(s) left",
    integer: true,
  },
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
    <div className="flex flex-col items-stretch">
      <div className="flex items-center gap-1">
        <TextWithUnit
          unit={unit}
          value={tracking.amount}
          integer={integer}
          size="lg"
        />
        <span className="text-xs leading-3">{label}</span>
      </div>
      {!!tracking.desiredAmount && (
        <>
          <ProgressBar
            className="h-2 row-start-2 col-span-full"
            data={[
              {
                name: "amount",
                value: tracking.amount,
                color: "black",
              },
            ]}
            totalValue={tracking.desiredAmount}
          />
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs">Ideal</span>
            <TextWithUnit
              unit={unit}
              value={tracking.desiredAmount}
              size="lg"
              integer={integer}
            />
          </div>
        </>
      )}
    </div>
  );
}
