import React from "react";
import { StorageCondition } from "../../../../../../types/FoodAmountTracking";
import { StorageConditionIcon } from "../../../../../../domain/FoodAmountTracking/containers";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import RotateToggleInput from "../../../../../Input/RotateToggleInput";

const STORAGE_CONDITION_OPTIONS = Object.values(StorageCondition).map(
  (condition) => ({
    value: condition,
    label: condition,
    icon: StorageConditionIcon[condition],
  })
);
const EMPTY_VALUE = {
  label: "unspecified",
  icon: "question" as IconProp,
};

type Props = {
  storageCondition?: StorageCondition;
  onToggle: (newCondition?: StorageCondition) => void;
  className?: string;
};
export default function StorageConditionToggle({
  storageCondition,
  onToggle,
  className,
}: Props) {
  return (
    <RotateToggleInput
      className={className}
      value={storageCondition?.toString() ?? ""}
      onChange={onToggle}
      availableValues={STORAGE_CONDITION_OPTIONS}
      emptyValue={EMPTY_VALUE}
    />
  );
}
