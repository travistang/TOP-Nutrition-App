import { useContext } from "react";
import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import { DrawerContent } from "../../../../Drawer/DrawerContainer";
import { drawerContext } from "../../../../Drawer/DrawerContext";
import FoodTrackingModePicker from "../FoodTrackingModePicker";

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
    <DrawerContent className="pr-2">
      <FoodTrackingModePicker
        value={trackingType ?? null}
        onChange={onChangeWithModalClose}
      />
    </DrawerContent>
  );
}
