import { createContext } from "react";
import { DEFAULT_FOOD, Food } from "../../../../../types/Food";

type StepAddFoodContentFormContextProps = {
  food: Food;
  setFood: (food: Food) => void;
};
const defaultContextValue: StepAddFoodContentFormContextProps = {
  food: DEFAULT_FOOD,
  setFood: () => { },
}
export const stepAddFoodContentFormContext = createContext<StepAddFoodContentFormContextProps>(defaultContextValue);

type Props = {
  children: React.ReactNode;
  food: Food;
  setFood: (food: Food) => void;
}
export default function StepAddFoodContentFormContextProvder({ children, food, setFood }: Props) {
  return (
    <stepAddFoodContentFormContext.Provider value={{food, setFood}}>
      {children}
    </stepAddFoodContentFormContext.Provider>
  )
}