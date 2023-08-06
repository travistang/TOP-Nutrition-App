import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import consumptionDatabase, {
  FoodDetails,
} from "../../database/ConsumptionDatabase";
import { FoodAmountTracking } from "../../types/FoodAmountTracking";
import FoodTrackingForm from "../FoodDetailPage/FoodDetailSection/FoodTrackingSection/FoodTrackingForm";
import Button, { ButtonStyle } from "../Input/Button";
import Modal from "../Modal";

type Props = {
  onClose: () => void;
  foodDetail: FoodDetails | null;
};

export default function EditFoodTrackingModal({ onClose, foodDetail }: Props) {
  const [trackingPlaceholder, setTrackingPlaceholder] =
    useState<FoodAmountTracking | null>(foodDetail?.amountTracking ?? null);

  useEffect(() => {
    setTrackingPlaceholder(foodDetail?.amountTracking ?? null);
  }, [foodDetail]);

  if (!trackingPlaceholder) return null;

  const saveTracking = async () => {
    if (!trackingPlaceholder) return;
    try {
      await consumptionDatabase.updateFoodDetails(foodDetail!.id, {
        amountTracking: trackingPlaceholder,
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
      opened={!!trackingPlaceholder}
      onClose={onClose}
      className="pr-4"
    >
      <div className="flex flex-col items-stretch gap-2">
        {trackingPlaceholder && (
          <FoodTrackingForm
            onChange={setTrackingPlaceholder}
            tracking={trackingPlaceholder}
            className="pr-4"
          />
        )}
        <div className="flex items-center justify-end pr-4">
          <Button
            buttonStyle={ButtonStyle.Block}
            icon="save"
            text="Save"
            className="w-1/3"
            onClick={saveTracking}
          />
        </div>
      </div>
    </Modal>
  );
}
