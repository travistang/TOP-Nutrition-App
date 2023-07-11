import classNames from "classnames";
import { useState } from "react";
import { FoodAmountTracking } from "../../../../types/FoodAmountTracking";
import EmptyNotice from "../../../EmptyNotice";
import Modal from "../../../Modal";
import FoodTrackingModePicker from "./FoodTrackingModePicker";

type Props = {
  className?: string;
  foodTracking?: FoodAmountTracking;
};

export default function SetupFoodTrackingEntry({
  foodTracking,
  className,
}: Props) {
  const [showFoodTrackingSetupModal, setShowFoodTrackingSetupModal] =
    useState(false);
  return (
    <>
      <EmptyNotice
        className={classNames(className)}
        message="Not amount tracking set for this food. Click to setup"
        onClick={() => setShowFoodTrackingSetupModal(true)}
      />
      <Modal
        label="Setup food tracking"
        opened={showFoodTrackingSetupModal}
        onClose={() => setShowFoodTrackingSetupModal(false)}
      >
        <FoodTrackingModePicker
          value={foodTracking?.type ?? null}
          onChange={console.log}
        />
      </Modal>
    </>
  );
}
