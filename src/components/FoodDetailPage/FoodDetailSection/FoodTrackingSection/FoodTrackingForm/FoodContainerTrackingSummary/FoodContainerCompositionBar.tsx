import React from "react";
import AttributeValue from "../../../../../Input/AttributeValue";
import ProgressBar from "../../../../../ProgressBar";
import {
  Container,
  FoodContainerTracking,
} from "../../../../../../types/FoodAmountTracking";
import {
  ContainerUsage,
  UsageColorMap,
  containersByUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import Legend from "../../../../../Legend";

const CONTAINER_USAGE_ORDER = [
  ContainerUsage.Full,
  ContainerUsage.Empty,
  ContainerUsage.Used,
  ContainerUsage.Expired,
];
const containersUsageToBarData = (
  usages: Record<ContainerUsage, Container[]>
) => {
  return CONTAINER_USAGE_ORDER.map((usage) => {
    return {
      name: usage,
      value: usages[usage]?.length ?? 0,
      color: UsageColorMap[usage],
    };
  });
};

type Props = {
  className?: string;
  tracking: FoodContainerTracking;
};

export default function FoodContainerCompositionBar({
  tracking,
  className,
}: Props) {
  const { containers } = tracking;
  const containerUsages = containersByUsage(containers);
  const data = containersUsageToBarData(containerUsages);

  return (
    <AttributeValue label="Containers" className={className}>
      <ProgressBar
        data={data}
        className="w-full h-4"
        totalValue={containers.length}
      />
      <div className="flex items-center gap-2 justify-end">
        {CONTAINER_USAGE_ORDER.map((usage) => (
          <Legend key={usage} color={UsageColorMap[usage]} label={usage} />
        ))}
      </div>
    </AttributeValue>
  );
}
