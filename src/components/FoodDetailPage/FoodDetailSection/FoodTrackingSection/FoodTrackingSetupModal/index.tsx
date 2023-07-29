import React from "react";
import Modal from "../../../../Modal";
import { FoodAmountTracking } from "../../../../../types/FoodAmountTracking";
import useFoodTrackingPlaceholder from "../useFoodTrackingPlaceholder";
import FoodTrackingForm from "../FoodTrackingForm";
import Drawer from "../../../../Drawer";
import { MainContent } from "../../../../Drawer/DrawerContainer";
import FoodTrackingTypeDisplay from "../FoodTrackingTypeDisplay";
import EmptyNotice from "../../../../EmptyNotice";
import Button from "../../../../Input/Button";
import FoodTrackingSetupModalDrawer from "./FoodTrackingSetupModalDrawer";

type Props = {
  className?: string;
  opened: boolean;
  onClose: () => void;
  tracking?: FoodAmountTracking;
  onUpdate: (tracking: FoodAmountTracking) => Promise<boolean>;
};

export default function FoodTrackingSetupModal({
  tracking,
  opened,
  onClose,
  onUpdate,
}: Props) {
  const [foodTrackingPlaceholder, { changeType, updatePlaceholder }] =
    useFoodTrackingPlaceholder(tracking ?? null);

  const onSave = async () => {
    if (!foodTrackingPlaceholder) return;
    const updated = await onUpdate(foodTrackingPlaceholder);
    if (updated) onClose();
  };

  return (
    <Modal label="Setup food tracking" opened={opened} onClose={onClose}>
      <Drawer className="-mx-2">
        <MainContent>
          <div className="flex flex-col items-stretch w-full gap-2">
            <FoodTrackingTypeDisplay
              type={foodTrackingPlaceholder?.type ?? null}
            />
            {foodTrackingPlaceholder ? (
              <FoodTrackingForm
                tracking={foodTrackingPlaceholder}
                onChange={updatePlaceholder}
              />
            ) : (
              <EmptyNotice message="Tracking will be disabled" />
            )}
            <div className="flex items-center justify-end">
              <Button
                className="Save"
                icon="save"
                onClick={onSave}
                text="Save"
              />
            </div>
          </div>
        </MainContent>
        <FoodTrackingSetupModalDrawer
          trackingType={foodTrackingPlaceholder?.type}
          onChange={changeType}
        />
      </Drawer>
    </Modal>
  );
}
