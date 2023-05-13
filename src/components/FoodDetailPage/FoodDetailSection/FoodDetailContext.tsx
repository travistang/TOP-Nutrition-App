import { createContext } from "react";
import { ConsumptionRecord } from "../../../database/ConsumptionDatabase";

export const foodDetailContext = createContext<ConsumptionRecord[]>([]);

type Props = {
  records: ConsumptionRecord[];
  children: React.ReactNode;
};
export default function FoodDetailContextProvider({
  records,
  children,
}: Props) {
  return (
    <foodDetailContext.Provider value={records}>
      {children}
    </foodDetailContext.Provider>
  );
}
