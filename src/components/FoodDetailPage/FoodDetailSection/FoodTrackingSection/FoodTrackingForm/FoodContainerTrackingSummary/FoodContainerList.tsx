import classNames from "classnames";
import { useState } from "react";
import {
  containerPrecedence,
  containersByUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import {
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../../types/FoodAmountTracking";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import FoodContainerItem from "./FoodContainerItem";

type Props = {
  className?: string;
  tracking: FoodTrackingWithType<FoodAmountTrackingType.Container>;
};
export default function FoodContainerList({ className, tracking }: Props) {
  const [expanded, setExpanded] = useState(false);

  const { containers } = tracking;
  const containersGroupedByUsage = containersByUsage(containers);
  const sortedContainers = Object.values(containersGroupedByUsage)
    .flat()
    .sort(containerPrecedence);

  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {containers.length > 0 && (
        <Button
          buttonStyle={ButtonStyle.Clear}
          icon={expanded ? "caret-up" : "caret-down"}
          text={expanded ? "Hide container details" : "Show all containers"}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {expanded &&
        sortedContainers.map((container) => (
          <FoodContainerItem
            key={container.id}
            container={container}
            onEdit={console.log}
          />
        ))}
    </div>
  );
}
