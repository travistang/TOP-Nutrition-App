import { createContext } from "react";
import { FoodDetails } from "../../../database/ConsumptionDatabase";

export const foodDetailContext = createContext<FoodDetails>({
  id: "",
  nutritionPerHundred: {
    carbohydrates: 0,
    calories: 0,
    fat: 0,
    protein: 0,
  },
  name: "",
});

type Props = {
  foodDetails: FoodDetails;
  children?: React.ReactNode;
};
export default function FoodDetailContextProvider({
  children,
  foodDetails,
}: Props) {
  return (
    <foodDetailContext.Provider value={foodDetails}>
      {children}
    </foodDetailContext.Provider>
  );
}
