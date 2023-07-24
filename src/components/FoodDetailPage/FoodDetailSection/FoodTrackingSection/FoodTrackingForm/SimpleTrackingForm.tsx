import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import AttributeValueInputGroup from "../../../../Input/AttributeValueInputGroup";
import {
  AcceptableAttributes,
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup/types";

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
  const updateValue = (newValue: AcceptableAttributes) => {
    onChange({
      ...tracking,
      amount: newValue as number,
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
      selectedField="amount"
      onChange={updateValue}
    />
  );
}
