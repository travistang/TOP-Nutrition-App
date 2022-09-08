import React from 'react';
import { useMaintenanceCalories } from '../../domain/MaintenanceCalories';
import { TargetCaloriesConfigType } from '../../types/TargetCalories';
import NumberInput from '../Input/NumberInput';
import SelectInput from '../Input/SelectInput';
import ScalarWidget from '../Widgets/ScalarWidget';
import { TargetCaloriesFormProps } from './types';

enum SurplusDeficitSign {
  Surplus = 'surplus',
  Deficit = 'deficit',
}

const surplusDeficitOption = [
  {
    label: 'Surplus',
    value: SurplusDeficitSign.Surplus
  },
  {
    label: 'Deficit',
    value: SurplusDeficitSign.Deficit
  },
];
export default function MaintenanceCaloriesSurplusForm({ onUpdatePlaceholder, targetCaloriesConfigPlaceholder }: TargetCaloriesFormProps) {
  const maintenanceCalories = useMaintenanceCalories();
  if (targetCaloriesConfigPlaceholder.type !== TargetCaloriesConfigType.FromMaintenanceCalories) return null;

  const { surplus } = targetCaloriesConfigPlaceholder;
  const absSurplus = Math.abs(surplus);
  const sign = surplus > 0 ? SurplusDeficitSign.Surplus : SurplusDeficitSign.Deficit;

  const setValue = (value: number) => {
    const newSurplus = sign === SurplusDeficitSign.Surplus ? value : -value;
    onUpdatePlaceholder({ ...targetCaloriesConfigPlaceholder, surplus:  newSurplus });

  }

  const onChangeSign = (sign: SurplusDeficitSign) => {
    const newSurplus = sign === SurplusDeficitSign.Surplus ? absSurplus : -absSurplus;
    onUpdatePlaceholder({ ...targetCaloriesConfigPlaceholder, surplus: newSurplus });
  }

  return (
    <>
      <NumberInput
        label="Calories difference"
        value={absSurplus}
        onChange={setValue}
        className="col-span-3"
      />
      <SelectInput
        label="Surplus or deficit"
        className="col-span-2"
        options={surplusDeficitOption}
        value={sign}
        onSelect={newSign => onChangeSign(newSign as SurplusDeficitSign)}
      />
      <ScalarWidget
        label="Maintenance Calories"
        className="col-span-3 col-start-1"
        unit="kcal"
        value={maintenanceCalories}
      />
      <ScalarWidget
        unit="kcal"
        label="Target calories"
        className="col-span-3"
        value={maintenanceCalories !== null ? maintenanceCalories + surplus : null}
      />

    </>
  );
}