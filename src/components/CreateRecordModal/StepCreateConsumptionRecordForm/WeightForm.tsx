import React from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../../atoms/CreateEditRecordAtom';
import DigitInput from '../../Input/DigitInput';

export default function WeightForm() {
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(createEditRecordAtom);
  const { record: {amount} } = consumptionRecord
  const onUpdateAmount = (newAmount: number) => {
    setConsumptionRecord(atom => ({
      ...atom,
      record: { ...atom.record, amount: newAmount }
    }));
  }
  return (
    <>
      <span className="text-xs">Amount consumed</span>
      <DigitInput
        defaultValue={amount}
        onChange={onUpdateAmount}
        unit="g"
      />
    </>
  );
}