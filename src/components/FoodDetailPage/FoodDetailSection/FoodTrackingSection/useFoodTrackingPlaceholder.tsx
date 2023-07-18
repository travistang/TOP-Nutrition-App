import { useState } from "react";
import {
  FoodAmountTracking,
  FoodAmountTrackingType,
} from "../../../../types/FoodAmountTracking";

const DEFAULT_TRACKING_VALUES: {
  [T in FoodAmountTrackingType]: Extract<FoodAmountTracking, { type: T }>;
} = {
  [FoodAmountTrackingType.Container]: {
    containers: [],
    type: FoodAmountTrackingType.Container,
  },
  [FoodAmountTrackingType.Simple]: {
    type: FoodAmountTrackingType.Simple,
    amount: 0,
  },
  [FoodAmountTrackingType.Individual]: {
    type: FoodAmountTrackingType.Individual,
    amount: 0,
  },
  [FoodAmountTrackingType.IdenticalIndividual]: {
    type: FoodAmountTrackingType.IdenticalIndividual,
    amount: 0,
    amountPerContainer: 0,
  },
};

type UseFoodTrackingPlaceholderResult = [
  FoodAmountTracking | null,
  {
    changeType: (type: FoodAmountTrackingType | null) => void;
    updatePlaceholder: (
      value: Partial<Omit<FoodAmountTracking, "type">>
    ) => void;
  }
];
export default function useFoodTrackingPlaceholder(
  initialFoodTracking: FoodAmountTracking | null
): UseFoodTrackingPlaceholderResult {
  const [placeholder, setPlaceholder] = useState<FoodAmountTracking | null>(
    initialFoodTracking
  );

  const changeType = (type: FoodAmountTrackingType | null) => {
    if (type === null) {
      setPlaceholder(null);
      return;
    }
    setPlaceholder(DEFAULT_TRACKING_VALUES[type]);
  };

  const updatePlaceholder = (
    value: Partial<Omit<FoodAmountTracking, "type">>
  ) => {
    if (!placeholder) return;
    const newPlaceholder = {
      ...placeholder,
      ...value,
    };
    setPlaceholder(newPlaceholder);
  };

  return [
    placeholder,
    {
      changeType,
      updatePlaceholder,
    },
  ];
}
