import { useLiveQuery } from "dexie-react-hooks";
import ExpiredFoodDetail from "../components/FoodStockDetails/ExpiredFoodDetail";
import FoodDetail from "../components/FoodStockDetails/FoodDetail";
import FoodStockSectionTitle from "../components/FoodStockDetails/FoodStockSectionTitle";
import ConsumptionDatabase from "../database/ConsumptionDatabase";
import {
  hasExpiredContainers,
  shouldRestock,
} from "../domain/FoodAmountTracking/containers";

export default function FoodStockDetailPage() {
  const foodWithTracking =
    useLiveQuery(() =>
      ConsumptionDatabase.foodDetails
        .filter((detail) => !!detail.amountTracking)
        .toArray()
    ) ?? [];

  const underStockFood = foodWithTracking.filter((detail) =>
    shouldRestock(detail.amountTracking!)
  );
  const expiredFood = foodWithTracking.filter((detail) =>
    hasExpiredContainers(detail.amountTracking!)
  );

  const normalFood = foodWithTracking.filter((detail) => {
    return (
      !shouldRestock(detail.amountTracking!) &&
      !hasExpiredContainers(detail.amountTracking!)
    );
  });

  return (
    <div className="flex flex-col items-stretch gap-2">
      <FoodStockSectionTitle text="Understocked food" icon="battery-empty" />
      {underStockFood.map((food) => (
        <FoodDetail key={food.id} foodDetails={food} />
      ))}

      <FoodStockSectionTitle
        text="Food with expired containers"
        icon="skull-crossbones"
      />
      {expiredFood.map((food) => (
        <ExpiredFoodDetail key={food.id} foodDetails={food} />
      ))}

      <FoodStockSectionTitle text="Other tracked food" icon="hamburger" />
      {normalFood.map((food) => (
        <FoodDetail key={food.id} foodDetails={food} />
      ))}
    </div>
  );
}
