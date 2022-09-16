import React from 'react';
import NumberUtils from '../../utils/Number';
import ArrayUtils from '../../utils/Array';
import { format, addMinutes, startOfDay } from 'date-fns';
type Props = {
  intervalInMinute: number;
};
const numMinutesInDay = 60 * 24;
const NUM_LABELS = 4;
export default function TimeAxis({ intervalInMinute }: Props) {
  const numIntervals = Math.ceil(NumberUtils.safeDivide(numMinutesInDay, intervalInMinute));
  const showingLegendIndices = ArrayUtils.range(numIntervals, Math.floor(numIntervals / NUM_LABELS));
  return (
    <div className="flex flex-col flex-nowrap w-12">
      {
        ArrayUtils.range(numIntervals).map(i => (
          <span className="flex-1 flex-shrink-0 text-xs">{
            showingLegendIndices.includes(i) ?
              format(addMinutes(startOfDay(Date.now()), i * intervalInMinute), 'HH:mm')
              : ''
          }</span>
        ))
      }
    </div>
  );
}