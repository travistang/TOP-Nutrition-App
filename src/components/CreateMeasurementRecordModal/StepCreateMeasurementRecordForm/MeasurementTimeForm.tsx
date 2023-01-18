import React from 'react';
import { useRecoilState } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import ProgressiveTimeForm from '../../ProgressiveForm/TimeForm';
import ObjectUtils from '../../../utils/Object';

export default function MeasurementTimeForm() {
  const [{record}, setMeasurementRecord] = useRecoilState(createMeasurementRecordAtom);

  const isEditing = !!record.id;
  const setDate = (date: Date) => setMeasurementRecord((atom) =>
    ObjectUtils.deepUpdate(atom, 'record.date', date.getTime())
  );

  return (
    <ProgressiveTimeForm
      useCurrentTimeByDefault={!isEditing}
      title="Measurement time"
      date={new Date(record.date)}
      setDate={setDate}>

    </ProgressiveTimeForm>
  )
}