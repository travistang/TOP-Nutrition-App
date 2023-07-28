import classNames from "classnames";
import { FoodContainerTracking } from "../../../../../../types/FoodAmountTracking";
import FoodContainerList from "../../FoodTrackingForm/FoodContainerTrackingSummary/FoodContainerList";
import FoodContainerCompositionBar from "./FoodContainerCompositionBar";

type Props = {
  className?: string;
  tracking: FoodContainerTracking;
};
export default function FoodContainerTrackingDisplay({
  className,
  tracking,
}: Props) {
  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 py-2",
        className
      )}
    >
      {tracking.containers.length > 0 && (
        <FoodContainerCompositionBar tracking={tracking} />
      )}
      <span className="text-xs">Containers</span>
      <FoodContainerList containers={tracking.containers} />
    </div>
  );
}
