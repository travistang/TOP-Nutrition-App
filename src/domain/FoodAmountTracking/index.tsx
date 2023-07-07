import {
  FoodAmountTracking,
  FoodAmountTrackingType,
  FoodTrackingWithType,
} from "../../types/FoodAmountTracking";
import NumberUtils from "../../utils/Number";

export const totalAmount = (tracking: FoodAmountTracking) => {
  switch (tracking.type) {
    case FoodAmountTrackingType.Individual:
    case FoodAmountTrackingType.Simple:
      return tracking.amount;
    case FoodAmountTrackingType.IdenticalIndividual:
      return tracking.amount * tracking.amountPerContainer;
    case FoodAmountTrackingType.Container:
      return NumberUtils.sum(
        ...tracking.containers.map((container) => container.amount)
      );
    default:
      return 0;
  }
};
type FoodContainerTracking =
  FoodTrackingWithType<FoodAmountTrackingType.Container>;

export const subtractAmountFromContainerTracking = (
  tracking: FoodContainerTracking,
  amount: number,
  consumptionDate: number
): FoodContainerTracking => {
  const { containers } = tracking;
  if (containers.length === 0) return tracking;

  const containersByAmount = containers.sort((a, b) => a.amount - b.amount);
  let remainingConsumptionAmount = amount;
  for (let container of containersByAmount) {
    if (remainingConsumptionAmount <= 0) break;

    const wasContainerFull = container.amount === container.capacity;
    if (wasContainerFull) {
      container.openedAt = consumptionDate;
    }
    const amountToDeduct = Math.min(
      container.amount,
      remainingConsumptionAmount
    );
    container.amount -= amountToDeduct;
    remainingConsumptionAmount -= amountToDeduct;
  }

  const nonEmptyContainers = containersByAmount.filter(
    (container) => container.amount > 0
  );
  return {
    ...tracking,
    containers: nonEmptyContainers,
  };
};

export const subtractAmount = (
  tracking: FoodAmountTracking,
  amount: number,
  consumptionDate = Date.now()
): FoodAmountTracking => {
  switch (tracking.type) {
    case FoodAmountTrackingType.IdenticalIndividual:
    case FoodAmountTrackingType.Individual:
    case FoodAmountTrackingType.Simple:
      const newTracking = { ...tracking };
      newTracking.amount -= amount;
      return newTracking;
    case FoodAmountTrackingType.Container:
      return subtractAmountFromContainerTracking(
        tracking,
        amount,
        consumptionDate
      );
    default:
      return tracking;
  }
};
