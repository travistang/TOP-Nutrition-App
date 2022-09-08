import React from 'react';
import { TargetCaloriesConfigType } from '../../types/TargetCalories';
import NumberInput from '../Input/NumberInput';
import { TargetCaloriesFormProps } from './types';

export default function ConstantTargetCaloriesForm({ targetCaloriesConfigPlaceholder, onUpdatePlaceholder }: TargetCaloriesFormProps) {
  if (targetCaloriesConfigPlaceholder.type !== TargetCaloriesConfigType.Constant) return null;

  const { value } = targetCaloriesConfigPlaceholder;
  const setValue = (value: number) =>
    onUpdatePlaceholder({ ...targetCaloriesConfigPlaceholder, value });

  return (
    <NumberInput
      label="Target calories (kcal)"
      value={value}
      onChange={setValue}
      className="col-span-3"
    />
  );
}