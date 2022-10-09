import React from 'react';
import { Measurement } from '../../../types/Measurement';

type Props = {
  measurement: Measurement;
};
export default function MeasurementPreview({ measurement }: Props) {
  if (!measurement.name) return null;
  const showValue = !!measurement.unit;
  return (
    <div className="flex justify-between pt-2 pb-4">
      <span className="text-xs font-bold">{measurement.name}</span>
      {showValue && (
        <span className="text-xs font-bold">
          {measurement.value.toFixed(2)}{measurement.unit}
        </span>
      )}
    </div>
  );
}