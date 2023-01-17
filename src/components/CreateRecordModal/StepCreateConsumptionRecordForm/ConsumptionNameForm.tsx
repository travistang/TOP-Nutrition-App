import React, { useContext, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../../atoms/CreateEditRecordAtom';
import { ConsumptionRecord } from '../../../database/ConsumptionDatabase';
import { progressiveFormContext } from '../../ProgressiveForm/context';
import { CreateConsumptionStep } from './types';
import ObjectUtils from '../../../utils/Object';
import FoodNameForm from '../../ProgressiveForm/FoodNameForm';

export default function ConsumptionNameForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(createEditRecordAtom);
  const { goToStep } = useContext(progressiveFormContext);
  const onSearchName = (name: string) => {
    setConsumptionRecord(ObjectUtils.deepUpdate(consumptionRecord, 'record.name', name));
  };

  const onSelectItem = (item: ConsumptionRecord) => {
    setConsumptionRecord((atom) => {
      const { name, nutritionPerHundred } = item;
      return ObjectUtils.multiDeepUpdate(atom, {
        'record.name': name,
        'record.nutritionPerHundred': nutritionPerHundred,
      });
    });
    goToStep(CreateConsumptionStep.Amount);
  }

  useEffect(() => inputRef?.current?.focus(), []);

  return (
    <FoodNameForm
      name={consumptionRecord.record.name}
      onInputChange={onSearchName}
      onSelectRecord={onSelectItem}
    />
  )
}