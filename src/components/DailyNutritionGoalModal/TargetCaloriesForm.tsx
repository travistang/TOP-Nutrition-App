import React from 'react';
import { TargetCaloriesConfig, TargetCaloriesConfigType } from '../../types/TargetCalories';
import ConstantTargetCaloriesForm from './ConstantTargetCaloriesForm';
import MaintenanceCaloriesSurplusForm from './MaintenanceCaloriesSurplusForm';

type Props = {
  targetCaloriesConfigPlaceholder: TargetCaloriesConfig;
  onUpdatePlaceholder: (config: TargetCaloriesConfig) => void;
}

const getTargetCaloriesForm = (type: TargetCaloriesConfigType) => {
  switch(type) {
    case TargetCaloriesConfigType.Constant:
      return ConstantTargetCaloriesForm;
    case TargetCaloriesConfigType.FromMaintenanceCalories:
      return MaintenanceCaloriesSurplusForm;
    default:
      return null;
  }
}

export default function TargetCaloriesForm({ targetCaloriesConfigPlaceholder, onUpdatePlaceholder }:Props) {
  const Form = getTargetCaloriesForm(targetCaloriesConfigPlaceholder.type);
  if (!Form) return null;

  return <Form targetCaloriesConfigPlaceholder={targetCaloriesConfigPlaceholder} onUpdatePlaceholder={onUpdatePlaceholder} />
}