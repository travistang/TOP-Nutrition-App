import classNames from "classnames";
import { differenceInDays } from "date-fns";
import { FoodDetails } from "../../database/ConsumptionDatabase";
import { isContainerExpired } from "../../domain/FoodAmountTracking/containers";
import { FoodAmountTrackingType } from "../../types/FoodAmountTracking";
import ImageViewer from "../ImageViewer";

type Props = {
  foodDetails: FoodDetails;
  className?: string;
  onClick?: () => void;
};

export default function ExpiredFoodDetail({
  foodDetails,
  className,
  onClick,
}: Props) {
  if (foodDetails.amountTracking?.type !== FoodAmountTrackingType.Container) {
    return null;
  }
  const oldestExpiredContainer = foodDetails.amountTracking.containers
    .filter(isContainerExpired)
    .sort((a, b) => a.expiryDate! - b.expiryDate!)[0];
  if (!oldestExpiredContainer) return null;
  const numDaysExpired = differenceInDays(
    Date.now(),
    oldestExpiredContainer.expiryDate!
  );
  const { image, name } = foodDetails;
  return (
    <div onClick={onClick} className={classNames(className)}>
      <ImageViewer image={image ?? null} className="h-10" />
      <div className="flex flex-col gap-1 items-stretch flex-1 overflow-hidden">
        <span className="font-bold text-sm overflow-ellipsis line-clamp-2">
          {name}
        </span>
        <span className="font-bold text-red-500">
          Expired {numDaysExpired} days ago
        </span>
      </div>
    </div>
  );
}
