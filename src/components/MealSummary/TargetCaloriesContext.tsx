import React, { createContext } from 'react';
import { useTargetCalories } from '../../domain/TargetCalories';

export const targetCaloriesContext = createContext<number | null>(null);

type Props = {
  children: React.ReactNode;
  date: Date | number;
}
export default function TargetCaloriesContextProvider({ children, date }:Props) {
  const targetCalories = useTargetCalories(date, date);
  const targetCaloriesOfDay = Object.values(targetCalories)[0];
  return <targetCaloriesContext.Provider value={targetCaloriesOfDay ?? null}>
    {children}
  </targetCaloriesContext.Provider>
}