import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import AttributeValueInputGroup, {
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup";

type SimpleTracking =
  | FoodTrackingWithType<FoodAmountTrackingType.Simple>
  | FoodTrackingWithType<FoodAmountTrackingType.Individual>;
type Props = {
  className?: string;
  tracking: SimpleTracking;
  onChange: (newTrackingConfig: SimpleTracking) => void;
};
export default function SimpleTrackingForm({
  className,
  onChange,
  tracking,
}: Props) {
  const { type, ...value } = tracking;
  const updateValue = (newValue: Omit<SimpleTracking, "type">) => {
    onChange({
      ...newValue,
      type,
    });
  };
  const config =
    tracking.type === FoodAmountTrackingType.Simple
      ? {
          amount: {
            unit: "g",
            label: "Total amount of food in stock",
            widget: InputWidget.DigitPad,
          },
        }
      : {
          amount: {
            label: "Number of units",
            integer: true,
            widget: InputWidget.Ticker,
            min: 0,
          },
        };
  return (
    <AttributeValueInputGroup
      config={config}
      className={className}
      value={value}
      onChange={updateValue}
    />
  );
}
