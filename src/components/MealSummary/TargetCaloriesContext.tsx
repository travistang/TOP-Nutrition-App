import React, { createContext } from 'react';
import { isSameDay } from 'date-fns';
import { useTargetCalories } from '../../domain/TargetCalories';
import ObjectUtils from '../../utils/Object';

export const targetCaloriesContext = createContext<number | null>(null);

type Props = {
  children: React.ReactNode;
  date: Date | number;
}
export default function TargetCaloriesContextProvider({ children, date }:Props) {
  const targetCalories = useTargetCalories(date, date);
  const targetCaloriesOfDay = ObjectUtils.findByKey(targetCalories, (key) => isSameDay(date, new Date(key)));
  console.log({ targetCalories, targetCaloriesOfDay, date });
  return <targetCaloriesContext.Provider value={targetCaloriesOfDay ?? null}>
    {children}
  </targetCaloriesContext.Provider>
}