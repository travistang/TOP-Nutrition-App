import { format } from 'date-fns';
import React from 'react';
import { useMaintenanceCalories } from '../../domain/MaintenanceCalories';

export default function CurrentWeightInfo() {
  const { maintenanceCalories, currentWeight } = useMaintenanceCalories(true) ?? {};

  if (!currentWeight || !maintenanceCalories) return null;
  return (
    <>
      <div className="col-span-3 flex flex-col">
        <div className="text-xs col-span-full">
          Current weight
        </div>
        <div className="text-lg font-bold col-span-3">
          {currentWeight.value.toFixed(1)}kg
        </div>
        <span className="text-xs opaicty-70 leading-4">(at {format(currentWeight.date, 'dd/MM HH:mm')})</span>
      </div>
      <div className="col-span-3 flex flex-col ">
        <div className="text-xs">Maintenance calories</div>

        <div className="text-lg font-bold">
          {maintenanceCalories.toFixed(0)}kcal
        </div>
      </div>

    </>
  );
}