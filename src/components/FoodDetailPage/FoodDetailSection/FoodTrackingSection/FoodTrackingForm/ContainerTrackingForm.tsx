import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { useState } from "react";
import {
  Container,
  FoodContainerTracking,
} from "../../../../../types/FoodAmountTracking";
import AttributeValueInputGroup from "../../../../Input/AttributeValueInputGroup";
import {
  AcceptableAttributes,
  InputWidget,
} from "../../../../Input/AttributeValueInputGroup/types";
import Tab from "../../../../Tab";
import CreateContainerEntry from "./FoodContainerTrackingSummary/CreateContainerEntry";
import FoodContainerCompositionBar from "./FoodContainerTrackingSummary/FoodContainerCompositionBar";
import FoodContainerList from "./FoodContainerTrackingSummary/FoodContainerList";

type Props = {
  className?: string;
  tracking: FoodContainerTracking;
  onChange: (newTrackingConfig: FoodContainerTracking) => void;
};

const config = {
  containerCapacity: {
    unit: "g",
    label: "Capacity per container",
    widget: InputWidget.DigitPad,
  },
};
type ContainerTrackingPage = "configs" | "containers";
const getContainerTrackingTabsOptions = (
  onPageChange: (toPage: ContainerTrackingPage) => void
) => [
  {
    label: "Configs",
    icon: "cogs" as IconProp,
    onClick: () => onPageChange("configs"),
  },
  {
    label: "Containers",
    icon: "box" as IconProp,
    onClick: () => onPageChange("containers"),
  },
];
export default function ContainerTrackingForm({
  className,
  tracking,
  onChange,
}: Props) {
  const [page, setPage] = useState<ContainerTrackingPage>("configs");
  const { containerCapacity } = tracking;

  const updateValue = (newValue: AcceptableAttributes) => {
    onChange({ ...tracking, containerCapacity: newValue as number });
  };

  const onAddContainers = (newContainers: Container[]) => {
    onChange({
      ...tracking,
      containers: [...tracking.containers, ...newContainers],
    });
  };

  return (
    <>
      <Tab
        selected={(config) => config.label?.toLowerCase() === page}
        options={getContainerTrackingTabsOptions(setPage)}
      />
      {page === "containers" && (
        <div
          className={classNames("flex flex-col items-stretch gap-2", className)}
        >
          {!!tracking.containers.length && (
            <FoodContainerCompositionBar tracking={tracking} />
          )}
          <FoodContainerList tracking={tracking} />
          <CreateContainerEntry onAdd={onAddContainers} tracking={tracking} />
        </div>
      )}
      {page === "configs" && (
        <AttributeValueInputGroup
          config={config}
          selectedField="containerCapacity"
          className={className}
          value={{ containerCapacity }}
          onChange={updateValue}
        />
      )}
    </>
  );
}
