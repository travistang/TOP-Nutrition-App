import classNames from "classnames";
import { useState } from "react";
import {
  containerPrecedence,
  containersByUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import { Container } from "../../../../../../types/FoodAmountTracking";
import EmptyNotice from "../../../../../EmptyNotice";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import FoodContainerItemWithEditForm from "./FoodContainerItemWithEditForm";

type Props = {
  className?: string;
  containers: Container[];
  onUpdateContainer?: (newData: Container) => void;
};

const NUM_DISPLAY_CONTAINERS = 5;
export default function FoodContainerList({
  className,
  containers,
  onUpdateContainer,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const containersGroupedByUsage = containersByUsage(containers);
  const sortedContainers = Object.values(containersGroupedByUsage)
    .flat()
    .sort(containerPrecedence);
  const displayingContainers = sortedContainers.slice(
    0,
    NUM_DISPLAY_CONTAINERS
  );
  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 max-h-48 overflow-y-auto",
        className
      )}
    >
      {!displayingContainers.length && (
        <EmptyNotice message="No containers registered" />
      )}
      {displayingContainers.map((container) => (
        <FoodContainerItemWithEditForm
          onUpdate={onUpdateContainer}
          container={container}
          key={container.id}
        />
      ))}
      {expanded &&
        sortedContainers
          .slice(NUM_DISPLAY_CONTAINERS)
          .map((container) => (
            <FoodContainerItemWithEditForm
              onUpdate={onUpdateContainer}
              container={container}
              key={container.id}
            />
          ))}
      {sortedContainers.length > NUM_DISPLAY_CONTAINERS && (
        <Button
          buttonStyle={ButtonStyle.Clear}
          icon={expanded ? "caret-up" : "caret-down"}
          text={expanded ? "Hide container details" : "Show all containers"}
          onClick={() => setExpanded(!expanded)}
          className="sticky bottom-0 bg-gray-200"
        />
      )}
    </div>
  );
}
