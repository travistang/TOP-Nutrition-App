import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { isPast } from "date-fns";
import consumptionDatabase from "../../database/ConsumptionDatabase";
import {
  Container,
  FoodAmountTracking,
  FoodAmountTrackingType,
  FoodTrackingWithType,
  StorageCondition,
} from "../../types/FoodAmountTracking";
import { MarcoNutritionColor } from "../../types/Nutrition";
import ArrayUtils from "../../utils/Array";
import NumberUtils from "../../utils/Number";

export enum ContainerUsage {
  Full = "full",
  Empty = "empty",
  Used = "used",
  Expired = "expired",
}
export const UsageColorMap: Record<ContainerUsage, string> = {
  [ContainerUsage.Full]: "#1e293b",
  [ContainerUsage.Empty]: MarcoNutritionColor.carbohydrates,
  [ContainerUsage.Used]: MarcoNutritionColor.protein,
  [ContainerUsage.Expired]: MarcoNutritionColor.fat,
};

export const StorageConditionIcon: Record<StorageCondition, IconProp> = {
  [StorageCondition.Freezer]: "snowflake",
  [StorageCondition.Fridge]: "temperature-low",
  [StorageCondition.RoomTemperature]: "sun",
};
export const isContainerFull = (container: Container) => {
  return container.capacity === container.amount;
};

export const isContainerEmpty = (container: Container) => {
  const ratio = NumberUtils.safeDivide(container.amount, container.capacity);
  return ratio <= 0.05;
};

export const isContainerExpired = (container: Container) => {
  if (!container.expiryDate) return false;
  return isPast(container.expiryDate);
};

export const computeContainerUsage = (container: Container): ContainerUsage => {
  if (isContainerEmpty(container)) return ContainerUsage.Empty;
  if (isContainerExpired(container)) return ContainerUsage.Expired;
  if (isContainerFull(container)) return ContainerUsage.Full;
  return ContainerUsage.Used;
};

export const containersByUsage = (containers: Container[]) => {
  return ArrayUtils.groupBy<Container, ContainerUsage>(
    containers,
    computeContainerUsage
  );
};

export const containerPrecedence = (a: Container, b: Container): number => {
  if (a.expiryDate && b.expiryDate) return a.expiryDate - b.expiryDate;
  if (a.expiryDate && !b.expiryDate) return -1;
  if (b.expiryDate && !a.expiryDate) return 1;
  return a.amount - b.amount;
};

export const defaultContainerFromTracking = (
  tracking: FoodTrackingWithType<FoodAmountTrackingType.Container>
): Container => {
  return {
    id: "",
    capacity: tracking.containerCapacity,
    amount: tracking.containerCapacity,
  };
};

export const updateContainerDetails = async (
  foodDetailId: string,
  newContainer: Container
) => {
  const foodDetails = await consumptionDatabase.foodDetails.get(foodDetailId);
  if (!foodDetails) {
    throw new Error("No food details found when updating container details");
  }

  if (foodDetails.amountTracking?.type !== FoodAmountTrackingType.Container) {
    throw new Error("Incorrect food container tracking type");
  }

  return consumptionDatabase.updateFoodDetails(foodDetails.id, {
    amountTracking: {
      ...foodDetails.amountTracking,
      containers: foodDetails.amountTracking.containers.map((container) =>
        container.id === newContainer.id ? newContainer : container
      ),
    },
  });
};

export const shouldRestock = (tracking: FoodAmountTracking) => {
  if (tracking.type === FoodAmountTrackingType.Container) {
    return (
      !!tracking.minContainerInStock &&
      tracking.minContainerInStock >= tracking.containers.length
    );
  }

  return !!tracking.minAmount && tracking.minAmount >= tracking.amount;
};
