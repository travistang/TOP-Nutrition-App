import React from "react";
import toast from "react-hot-toast";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import Button from "../Input/Button";

type Props = {
  isFormValid: boolean;
  isEditing: boolean;
  onClose: () => void;
  consumption: Consumption & Partial<ConsumptionRecord>;
};
export default function SubmitButton({
  consumption,
  onClose,
  isFormValid,
  isEditing,
}: Props) {
  const applyChanges = async () => {
    if (!isFormValid) return;
    try {
      if (!isEditing) {
        await ConsumptionDatabase.add(consumption);
        toast.success("Record created");
        onClose();
        return;
      }
      await ConsumptionDatabase.edit(
        consumption.id as string,
        consumption as ConsumptionRecord
      );
      toast.success("Record updated");
      onClose();
      return;
    } catch {
      toast.error("Something went wrong. Try again later!");
    }
  };

  return (
    <Button
      text={isEditing ? "Update" : "Record"}
      disabled={!isFormValid}
      className="rounded-lg h-12 col-span-2 col-start-5"
      onClick={applyChanges}
    />
  );
}
