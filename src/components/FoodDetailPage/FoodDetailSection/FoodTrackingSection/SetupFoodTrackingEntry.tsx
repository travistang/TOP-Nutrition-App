import classNames from "classnames";
import { useState } from "react";
import { FoodAmountTracking } from "../../../../types/FoodAmountTracking";
import EmptyNotice from "../../../EmptyNotice";
import FoodTrackingSetupModal from "./FoodTrackingSetupModal";

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
        message="No amount tracking set for this food. Click to setup"
        onClick={() => setShowFoodTrackingSetupModal(true)}
      />
      <FoodTrackingSetupModal
        tracking={foodTracking}
        opened={showFoodTrackingSetupModal}
        onClose={() => setShowFoodTrackingSetupModal(false)}
      />
    </>
  );
}
