import React, { useContext } from 'react';
import CheckboxInput from '../../../../Input/CheckboxInput';
import DigitInput from '../../../../Input/DigitInput';
import { progressiveFormContext } from '../../../../ProgressiveForm/context';
import { stepAddFoodContentFormContext } from './stepAddFoodContentFormContext';

export default function AmountForm() {
  const { food, setFood} = useContext(stepAddFoodContentFormContext);
  const { toggleRestartOnComplete, restartOnComplete } = useContext(progressiveFormContext);
  return (
    <div className="flex flex-col items-stretch gap-2">
      <span>Amount of {food.name} in container:</span>
      <DigitInput
        defaultValue={food.amount}
        unit="g"
        onChange={amount => setFood({ ...food, amount })}
      />
      <CheckboxInput
        onCheck={toggleRestartOnComplete}
        selected={restartOnComplete}
        label="Add another food content"
      />
    </div>
  )
}