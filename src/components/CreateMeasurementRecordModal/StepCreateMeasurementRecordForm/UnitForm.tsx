import React from 'react';
import { useRecoilState } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import TextInput from '../../Input/TextInput';
import ObjectUtils from '../../../utils/Object';

export default function UnitForm() {
  const [measurementRecord, setMeasurementRecord] = useRecoilState(createMeasurementRecordAtom);
  const updateUnit = (unit: string) => {
    setMeasurementRecord(atom => ObjectUtils.deepUpdate(atom, 'record.unit', unit));
  }
  return (
    <TextInput
      className="w-full"
      label="Unit"
      value={measurementRecord.record.unit}
      onChange={updateUnit}
    />
  )
}