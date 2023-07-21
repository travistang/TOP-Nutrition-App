import React, { useContext } from "react";
import { DrawerContent } from "../../../../Drawer/DrawerContainer";
import FoodTrackingModePicker from "../FoodTrackingModePicker";
import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import { drawerContext } from "../../../../Drawer/DrawerContext";

type Props = {
  className?: string;
  trackingType?: FoodAmountTrackingType;
  onChange: (type: FoodAmountTrackingType | null) => void;
};

export default function FoodTrackingSetupModalDrawer({
  trackingType,
  onChange,
}: Props) {
  const { closeDrawer } = useContext(drawerContext);
  const onChangeWithModalClose = (type: FoodAmountTrackingType | null) => {
    onChange(type);
    closeDrawer();
  };
  return (
    <DrawerContent>
      <FoodTrackingModePicker
        value={trackingType ?? null}
        onChange={onChangeWithModalClose}
      />
    </DrawerContent>
  );
}
