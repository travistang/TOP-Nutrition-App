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
import FoodContainerList from "./FoodContainerTrackingSummary/FoodContainerList";

type Props = {
  className?: string;
  tracking: FoodContainerTracking;
  onChange: (newTrackingConfig: FoodContainerTracking) => void;
};

const config = {
  minContainerInStock: {
    label: "Desired number of containers",
    min: 0,
    integer: true,
    widget: InputWidget.Ticker,
  },
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
  const [selectedField, setSelectedField] =
    useState<keyof typeof config>("containerCapacity");
  const { containerCapacity, minContainerInStock } = tracking;

  const updateValue = (newValue: AcceptableAttributes) => {
    onChange({ ...tracking, [selectedField]: newValue as number });
  };

  const onAddContainers = (newContainers: Container[]) => {
    onChange({
      ...tracking,
      containers: [...tracking.containers, ...newContainers],
    });
  };

  const onUpdateContainer = (newData: Container) => {
    onChange({
      ...tracking,
      containers: tracking.containers.map((container) =>
        container.id === newData.id ? newData : container
      ),
    });
  };

  const onRemoveContainer = (id: string) => {
    onChange({
      ...tracking,
      containers: tracking.containers.filter(
        (container) => container.id !== id
      ),
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
          <FoodContainerList
            containers={tracking.containers}
            onUpdateContainer={onUpdateContainer}
            onRemoveContainer={onRemoveContainer}
          />
          <CreateContainerEntry onAdd={onAddContainers} tracking={tracking} />
        </div>
      )}
      {page === "configs" && (
        <AttributeValueInputGroup
          config={config}
          selectedField={selectedField}
          onSelectField={setSelectedField}
          className={className}
          value={{
            containerCapacity,
            minContainerInStock: minContainerInStock ?? null,
          }}
          onChange={updateValue}
        />
      )}
    </>
  );
}
