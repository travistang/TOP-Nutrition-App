import { format } from 'date-fns';
import React from 'react';
import MeasurementDomain from '../../domain/Measurement';
import Button, { ButtonStyle } from '../Input/Button';
import { MeasurementRecord } from '../../database/MeasurementDatabase';

type Props = {
  measurement: MeasurementRecord;
  onSelect: () => void;
}
export default function MeasurementRecordItem({ measurement, onSelect}: Props) {
  const onRemoveRecord = (e: React.MouseEvent) => {
    e.stopPropagation();
    MeasurementDomain.removeRecord(measurement.id);
  }

  return (
    <div
      onClick={onSelect}
      className="grid grid-cols-[auto_1fr_auto] gap-x-2"
    >
      <Button
        className="h-full w-8"
        icon="trash"
        onClick={onRemoveRecord}
        buttonStyle={ButtonStyle.Clear}  />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">{measurement.name}</span>
        <span className="text-xs opacity-70">
          {format(measurement.date, "MM-dd HH:mm")}
        </span>
      </div>
      <div className="flex items-center justify-center text-sm font-bold">
        {measurement.value.toFixed(2)}
        {measurement.unit}
      </div>
    </div>
  )
}