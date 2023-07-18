import classNames from "classnames";
import { useState } from "react";
import { FoodAmountTracking } from "../../../../types/FoodAmountTracking";
import EmptyNotice from "../../../EmptyNotice";
import Modal from "../../../Modal";
import FoodTrackingForm from "./FoodTrackingForm";
import FoodTrackingModePicker from "./FoodTrackingModePicker";
import useFoodTrackingPlaceholder from "./useFoodTrackingPlaceholder";

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
  const [foodTrackingPlaceholder, { changeType, updatePlaceholder }] =
    useFoodTrackingPlaceholder(foodTracking ?? null);

  return (
    <>
      <EmptyNotice
        className={classNames(className)}
        message="No amount tracking set for this food. Click to setup"
        onClick={() => setShowFoodTrackingSetupModal(true)}
      />
      <Modal
        label="Setup food tracking"
        opened={showFoodTrackingSetupModal}
        onClose={() => setShowFoodTrackingSetupModal(false)}
      >
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
    </>
  );
}
