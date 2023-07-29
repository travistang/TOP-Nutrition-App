import React, { useContext } from "react";
import classNames from "classnames";
import { FoodAmountTrackingType } from "../../../../types/FoodAmountTracking";
import FoodTrackingModePickerOption from "./FoodTrackingModePicker/FoodTrackingModePickerOption";
import { drawerContext } from "../../../Drawer/DrawerContext";
import Button, { ButtonStyle } from "../../../Input/Button";

type Props = {
  className?: string;
  type: FoodAmountTrackingType | null;
};

export default function FoodTrackingTypeDisplay({ type, className }: Props) {
  const { openDrawer } = useContext(drawerContext);
  return (
    <div
      className={classNames("flex flex-wrap justify-between gap-2", className)}
      onClick={openDrawer}
    >
      <span className="text-xs w-full">Tracking type</span>
      <FoodTrackingModePickerOption type={type ?? "none"} className="flex-1" />
      <Button
        icon="pen"
        onClick={openDrawer}
        buttonStyle={ButtonStyle.Clear}
        className="w-12"
      />
    </div>
  );
}
