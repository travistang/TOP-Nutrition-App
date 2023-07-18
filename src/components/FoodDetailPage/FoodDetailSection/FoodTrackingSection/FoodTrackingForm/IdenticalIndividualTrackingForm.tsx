import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import AttributeValueInputGroup, {
  InputConfig,
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup";

type IndividualIdenticalTracking =
  FoodTrackingWithType<FoodAmountTrackingType.IdenticalIndividual>;
type Props = {
  tracking: IndividualIdenticalTracking;
  onChange: (newTrackingConfig: IndividualIdenticalTracking) => void;
  className?: string;
};
const FormConfigMapping: Record<"amount" | "amountPerContainer", InputConfig> =
  {
    amount: {
      unit: "",
      label: "Number of units",
      integer: true,
      widget: InputWidget.Ticker,
    },
    amountPerContainer: {
      unit: "g",
      label: "Amount in each unit",
      widget: InputWidget.DigitPad,
    },
  };
export default function IdenticalIndividualTrackingForm({
  className,
  tracking,
  onChange,
}: Props) {
  const { type, ...value } = tracking;
  const updateValue = (newValue: Omit<IndividualIdenticalTracking, "type">) => {
    onChange({
      ...newValue,
      type,
    });
  };
  return (
    <AttributeValueInputGroup
      value={value}
      onChange={updateValue}
      config={FormConfigMapping}
      className={className}
    />
  );
}
