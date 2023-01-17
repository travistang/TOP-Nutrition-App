import React, { useContext } from 'react';
import { Consumption } from '../../../../../types/Consumption';
import { Food } from '../../../../../types/Food';
import { Modifier } from '../../../../../types/utils';
import FoodNameForm from '../../../../ProgressiveForm/FoodNameForm';
import { stepAddFoodContentFormContext } from './stepAddFoodContentFormContext';

export default function FoodForm() {
  const { food, setFood } = useContext(stepAddFoodContentFormContext);
  const updateFood: Modifier<Food> = (field) => (value) => food && setFood({ ...food, [field]: value });
  const onSelectRecord = (record: Consumption) => {
    if (!food) return;
    setFood({
      ...food,
      name: record.name,
      nutritionPerHundred: record.nutritionPerHundred,
    });
  };

  return (
    <FoodNameForm
      name={food?.name ?? ''}
      onInputChange={updateFood('name')}
      onSelectRecord={onSelectRecord}
    />
  );
}