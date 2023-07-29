export enum FoodAmountTrackingType {
  Individual = "individual", // in one unit that cannot be partially consumed. E.g. eggs
  IdenticalIndividual = "identical-individual", // same for individual but container has the same amount. e.g. instant noodles
  Container = "container", // juice in pack, meat in boxes etc.
  Simple = "simple", // gross sum (in grams) of kind of food, e.g. sugar, oil
}

export enum StorageCondition {
  Fridge = "fridge",
  Freezer = "freezer",
  RoomTemperature = "room temperature",
}

export type Container = {
  id: string;
  capacity: number;
  amount: number;
  expiryDate?: number;
  openedAt?: number;
  storageCondition?: StorageCondition;
  cooked?: boolean;
};

export type FoodAmountTracking =
  | {
      type: FoodAmountTrackingType.Simple;
      desiredAmount?: number;
      minAmount?: number;
      amount: number;
    }
  | {
      type: FoodAmountTrackingType.Individual;
      desiredAmount?: number;
      minAmount?: number;
      amount: number;
    }
  | {
      type: FoodAmountTrackingType.Container;
      minContainerInStock?: number;
      containerCapacity: number;
      containers: Container[];
    }
  | {
      type: FoodAmountTrackingType.IdenticalIndividual;
      desiredAmount?: number;
      minAmount?: number;
      amountPerContainer: number;
      amount: number;
    };

export type FoodTrackingWithType<T extends FoodAmountTrackingType> = Extract<
  FoodAmountTracking,
  { type: T }
>;

export type FoodContainerTracking =
  FoodTrackingWithType<FoodAmountTrackingType.Container>;
