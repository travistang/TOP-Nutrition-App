import { useState } from "react";
import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";
import AttributeValueInputGroup from "../../../../Input/AttributeValueInputGroup";
import {
  AcceptableAttributes,
  InputConfig,
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup/types";

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
  const [selectedField, setSelectedField] =
    useState<keyof typeof FormConfigMapping>("amount");

  const updateValue = (newValue: AcceptableAttributes) => {
    onChange({
      ...tracking,
      [selectedField]: newValue as number,
    });
  };
  return (
    <AttributeValueInputGroup
      value={value}
      selectedField={selectedField}
      onSelectField={setSelectedField}
      onChange={updateValue}
      config={FormConfigMapping}
      className={className}
    />
  );
}
