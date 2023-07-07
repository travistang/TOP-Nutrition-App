export enum FoodAmountTrackingType {
  Individual = "individual", // in one unit that cannot be partially consumed. E.g. eggs
  IdenticalIndividual = "identical-individual", // same for individual but container has the same amount. e.g. instant noodles
  Container = "container", // juice in pack, meat in boxes etc.
  Simple = "simple", // gross sum (in grams) of kind of food, e.g. sugar, oil
}

export type FoodAmountTracking =
  | {
      type: FoodAmountTrackingType.Simple | FoodAmountTrackingType.Individual;
      amount: number;
    }
  | {
      type: FoodAmountTrackingType.Container;
      containers: {
        id: string;
        capacity: number;
        amount: number;
        expiryDate?: number;
        openedAt?: number;
      }[];
    }
  | {
      type: FoodAmountTrackingType.IdenticalIndividual;
      amountPerContainer: number;
      amount: number;
    };

export type FoodTrackingWithType<T extends FoodAmountTrackingType> = Extract<
  FoodAmountTracking,
  { type: T }
>;
