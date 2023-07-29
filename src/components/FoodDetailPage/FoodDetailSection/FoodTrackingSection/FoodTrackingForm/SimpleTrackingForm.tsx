import { useState } from "react";
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
  | FoodTrackingWithType<FoodAmountTrackingType.IdenticalIndividual>
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
  const [selectedField, setSelectedField] =
    useState<Exclude<keyof SimpleTracking, "type">>("amount");
  const updateValue = (newValue: AcceptableAttributes) => {
    onChange({
      ...tracking,
      [selectedField]: newValue as number,
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
          minAmount: {
            unit: "g",
            label: "Minimum amount",
            widget: InputWidget.DigitPad,
          },
          desiredAmount: {
            unit: "g",
            label: "Ideal amount",
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
          minAmount: {
            unit: "",
            label: "Minimum number of units",
            min: 0,
            widget: InputWidget.Ticker,
          },
          desiredAmount: {
            label: "Ideal amount",
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
      selectedField={selectedField}
      onSelectField={setSelectedField}
      onChange={updateValue}
    />
  );
}
