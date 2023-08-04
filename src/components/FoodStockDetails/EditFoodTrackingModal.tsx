import React from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { FoodAmountTracking } from "../../types/FoodAmountTracking";
import FoodTrackingForm from "../FoodDetailPage/FoodDetailSection/FoodTrackingSection/FoodTrackingForm";
import consumptionDatabase, {
  FoodDetails,
} from "../../database/ConsumptionDatabase";

type Props = {
  onClose: () => void;
  foodDetail: FoodDetails | null;
};

export default function EditFoodTrackingModal({ onClose, foodDetail }: Props) {
  const { amountTracking: tracking } = foodDetail ?? {};
  const updateTracking = async (newTracking: FoodAmountTracking | null) => {
    try {
      await consumptionDatabase.updateFoodDetails(foodDetail!.id, {
        amountTracking: newTracking ?? undefined,
      });
      toast.success("Tracking settings updated");
      onClose();
      return true;
    } catch (e) {
      toast.error("Failed to update tracking settings");
      return false;
    }
  };
  return (
    <Modal
      label="Edit tracking"
      opened={!!tracking}
      onClose={onClose}
      className="ml-[100vw] pr-4"
    >
      {tracking && (
        <FoodTrackingForm
          onChange={updateTracking}
          tracking={tracking}
          className="pr-4"
        />
      )}
    </Modal>
  );
}
