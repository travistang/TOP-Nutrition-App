import { FoodDetails } from "../../database/ConsumptionDatabase";
import { FoodAmountTrackingType } from "../../types/FoodAmountTracking";
import FoodDetail from "./FoodDetail";

const meta = {
  title: "FoodStockDetails/FoodDetail",
  component: FoodDetail,
};

export default meta;

export const Main = () => {
  const foodDetails: FoodDetails = {
    name: "Sample food",
    nutritionPerHundred: {
      carbohydrates: 42,
      fat: 42,
      protein: 42,
      calories: 42,
    },
    id: "",
    amountTracking: {
      type: FoodAmountTrackingType.Simple,
      minAmount: 10,
      desiredAmount: 50,
      amount: 4,
    },
  };

  return <FoodDetail foodDetails={foodDetails} />;
};
