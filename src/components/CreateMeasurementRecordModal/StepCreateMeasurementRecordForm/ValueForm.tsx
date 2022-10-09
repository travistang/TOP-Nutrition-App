import React from 'react';
import { useRecoilState } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import DigitInput from '../../Input/DigitInput';
import ObjectUtils from '../../../utils/Object';

export default function ValueForm() {
  const [{ record },setCreateMeasurementRecord] = useRecoilState(createMeasurementRecordAtom);
  const onChangeValue = (value: number) => {
    setCreateMeasurementRecord(atom => ObjectUtils.deepUpdate(atom, 'record.value', value));
  }
  return (
    <DigitInput unit={record.unit} defaultValue={record.value} onChange={onChangeValue} />
  )
}