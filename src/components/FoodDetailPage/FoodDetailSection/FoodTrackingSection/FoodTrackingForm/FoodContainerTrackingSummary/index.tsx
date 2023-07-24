import {
  ContainerUsage,
  UsageColorMap,
  containersByUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import {
  Container,
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../../../../../types/FoodAmountTracking";
import AttributeValue from "../../../../../Input/AttributeValue";
import Legend from "../../../../../Legend";
import ProgressBar from "../../../../../ProgressBar";
import FoodContainerList from "./FoodContainerList";

type Props = {
  className?: string;
  tracking: FoodTrackingWithType<FoodAmountTrackingType.Container>;
};

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
export default function FoodContainerTrackingSummary({
  className,
  tracking,
}: Props) {
  const { containers } = tracking;
  const containerUsages = containersByUsage(containers);
  const data = containersUsageToBarData(containerUsages);
  return (
    <div className="flex flex-col items-stretch gap-2">
      {!!containers.length && (
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
      )}
      <FoodContainerList tracking={tracking} />
    </div>
  );
}
