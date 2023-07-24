import classNames from "classnames";
import { useContext, useState } from "react";
import {
  containerPrecedence,
  containersByUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../../types/FoodAmountTracking";
import { drawerContext } from "../../../../../Drawer/DrawerContext";
import EmptyNotice from "../../../../../EmptyNotice";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import FoodContainerItem from "./FoodContainerItem";

type Props = {
  className?: string;
  tracking: FoodTrackingWithType<FoodAmountTrackingType.Container>;
};
export default function FoodContainerList({ className, tracking }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { openDrawer } = useContext(drawerContext);
  const { containers } = tracking;
  const { used, ...otherContainersByUsage } = containersByUsage(containers);
  const otherContainers = Object.values(otherContainersByUsage)
    .flat()
    .sort(containerPrecedence);

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {!containers.length ? (
        <EmptyNotice
          onClick={openDrawer}
          message="No containers recorded. Click to setup"
        />
      ) : (
        <>
          <Button
            buttonStyle={ButtonStyle.Block}
            text="Add container"
            icon="plus"
            className="w-max justify-self-end"
            onClick={openDrawer}
          />
          <Button
            buttonStyle={ButtonStyle.Clear}
            icon={expanded ? "caret-up" : "caret-down"}
            text={expanded ? "Hide container details" : "Show all containers"}
            onClick={() => setExpanded(!expanded)}
          />
        </>
      )}
      {expanded &&
        otherContainers.map((container) => (
          <FoodContainerItem
            key={container.id}
            container={container}
            onEdit={console.log}
          />
        ))}
    </div>
  );
}
