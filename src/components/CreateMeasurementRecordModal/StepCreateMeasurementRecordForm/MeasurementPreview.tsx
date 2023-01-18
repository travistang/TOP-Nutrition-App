import React from 'react';
import { Measurement } from '../../../types/Measurement';
import SmallNotice from '../../SmallNotice';

type Props = {
  measurement: Measurement & { id?: string };
};
export default function MeasurementPreview({ measurement }: Props) {
  if (!measurement.name) return null;
  const showValue = !!measurement.unit;
  const isEditing = !!measurement.id;
  return (
    <div className="grid grid-cols-6 justify-between pt-2 pb-4 gap-y-2">
      {isEditing && <SmallNotice className="col-span-full" icon="info-circle">You are editing an existing record</SmallNotice>}
      <span className="text-xs font-bold col-span-4">{measurement.name}</span>
      {showValue && (
        <span className="text-xs font-bold col-span-2 justify-self-end">
          {measurement.value.toFixed(2)}{measurement.unit}
        </span>
      )}
    </div>
  );
}