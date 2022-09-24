import React from "react";
import { useCurrentBodyWeight } from "../../../domain/BodyWeight";
import { Equipment } from "../../../types/Exercise";
import EquipmentModeInput from "./EquipmentModeInput";

export default function EquipmentForm() {
  const { currentWeight } = useCurrentBodyWeight();
  const isCurrentWeightKnown = !!currentWeight;
  return (
    <>
      <EquipmentModeInput label="Exercise mode" field="exerciseMode" />
      <EquipmentModeInput
        label="Equipment"
        field="equipment"
        disabledOptions={
          isCurrentWeightKnown ? undefined : [Equipment.BodyWeight]
        }
      />
    </>
  );
}
