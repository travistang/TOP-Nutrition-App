import React from "react";
import Modal from "../../../Modal";
import { FoodAmountTracking } from "../../../../types/FoodAmountTracking";
import FoodTrackingModePicker from "./FoodTrackingModePicker";
import useFoodTrackingPlaceholder from "./useFoodTrackingPlaceholder";
import FoodTrackingForm from "./FoodTrackingForm";

type Props = {
  className?: string;
  opened: boolean;
  onClose: () => void;
  tracking?: FoodAmountTracking;
};

export default function FoodTrackingSetupModal({
  tracking,
  opened,
  onClose,
  className,
}: Props) {
  const [foodTrackingPlaceholder, { changeType, updatePlaceholder }] =
    useFoodTrackingPlaceholder(tracking ?? null);
  return (
    <Modal label="Setup food tracking" opened={opened} onClose={onClose}>
      <div className="flex flex-col items-stretch gap-2">
        <FoodTrackingModePicker
          value={foodTrackingPlaceholder?.type ?? null}
          onChange={changeType}
        />
        {foodTrackingPlaceholder && (
          <FoodTrackingForm
            tracking={foodTrackingPlaceholder}
            onChange={updatePlaceholder}
          />
        )}
      </div>
    </Modal>
  );
}
