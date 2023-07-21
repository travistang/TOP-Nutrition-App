import React from "react";
import AttributeValueInputGroup, {
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup";
import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../types/FoodAmountTracking";

type Props = {
  className?: string;
  tracking: FoodTrackingWithType<FoodAmountTrackingType.Container>;
  onChange: (
    newTrackingConfig: FoodTrackingWithType<FoodAmountTrackingType.Container>
  ) => void;
};

const config = {
  containerCapacity: {
    unit: "g",
    label: "Capacity per container",
    widget: InputWidget.DigitPad,
  },
};
export default function ContainerTrackingForm({
  className,
  tracking,
  onChange,
}: Props) {
  const { containerCapacity } = tracking;

  const updateValue = (
    newValue: Omit<
      FoodTrackingWithType<FoodAmountTrackingType.Container>,
      "type" | "containers"
    >
  ) => {
    onChange({ ...tracking, ...newValue });
  };
  return (
    <AttributeValueInputGroup
      config={config}
      className={className}
      value={{ containerCapacity }}
      onChange={updateValue}
    />
  );
}
