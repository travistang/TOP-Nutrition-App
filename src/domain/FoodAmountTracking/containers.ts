import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { isPast } from "date-fns";
import {
  Container,
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
  [ContainerUsage.Used]: "#9ca3af",
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
