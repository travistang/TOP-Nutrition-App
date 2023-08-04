import classNames from "classnames";
import { FoodDetails } from "../../database/ConsumptionDatabase";
import {
  FoodAmountTracking,
  FoodAmountTrackingType,
} from "../../types/FoodAmountTracking";
import { MarcoNutritionColor } from "../../types/Nutrition";
import ImageViewer from "../ImageViewer";
import ProgressBar from "../ProgressBar";
import TextWithUnit from "../TextWithUnit";

type Props = {
  foodDetails: FoodDetails;
  className?: string;
  onClick?: () => void;
};

const getFoodAmount = (tracking: FoodAmountTracking) => {
  if (tracking.type === FoodAmountTrackingType.Container) {
    return tracking.containers.length;
  }
  return tracking.amount;
};

const getMaxFoodAmount = (tracking: FoodAmountTracking) => {
  if (tracking.type === FoodAmountTrackingType.Container) {
    return tracking.minContainerInStock ?? 0;
  }

  return tracking.desiredAmount ?? 0;
};

const getMinFoodAmount = (tracking: FoodAmountTracking) => {
  if (tracking.type === FoodAmountTrackingType.Container) {
    return tracking.minContainerInStock ?? 0;
  }

  return tracking.minAmount ?? 0;
};

const getProgressBarData = (currentValue: number, minValue: number) => {
  return [
    {
      name: "amount",
      value: currentValue,
      color: "black",
    },
    {
      name: "amount",
      value: currentValue - minValue,
      color: MarcoNutritionColor.protein,
    },
  ];
};

const getTrackingAmountUnit = (trackingType: FoodAmountTrackingType) => {
  switch (trackingType) {
    case FoodAmountTrackingType.Container:
      return "containers";
    case FoodAmountTrackingType.Individual:
    case FoodAmountTrackingType.IdenticalIndividual:
      return "units";
    case FoodAmountTrackingType.Simple:
      return "g";
    default:
      return "";
  }
};
export default function FoodDetail({ onClick, className, foodDetails }: Props) {
  const { amountTracking, image, name } = foodDetails;
  if (!amountTracking) return null;

  const totalValue = getMaxFoodAmount(amountTracking);
  const currentValue = getFoodAmount(amountTracking);
  const minValue = getMinFoodAmount(amountTracking);
  const data = getProgressBarData(currentValue, minValue);

  const isIntegerAmount = amountTracking.type !== FoodAmountTrackingType.Simple;
  const unit = getTrackingAmountUnit(amountTracking.type);
  return (
    <div
      key={foodDetails.id}
      onClick={onClick}
      className={classNames(
        "flex items-center gap-2 rounded-lg px-2 py-1 bg-gray-300",
        className
      )}
    >
      <ImageViewer image={image ?? null} className="h-10" />
      <div className="flex flex-col gap-1 items-stretch flex-1 overflow-hidden">
        <span className="font-bold text-sm overflow-ellipsis line-clamp-2">
          {name}
        </span>
        <ProgressBar
          className="h-2 w-full"
          totalValue={totalValue}
          data={data}
        />
      </div>
      <TextWithUnit
        className="w-20 justify-end"
        size="lg"
        value={currentValue}
        integer={isIntegerAmount}
        unit={unit}
      />
    </div>
  );
}
