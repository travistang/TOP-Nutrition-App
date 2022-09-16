import React from 'react';
import { format } from 'date-fns';

import ArrayUtils from '../../utils/Array';

type Props = {
  daysInInterval: Date[];
};

const NUM_LABELS = 4;

export default function DateAxis({ daysInInterval }: Props) {
  const numDays = daysInInterval.length;
  if (numDays === 0) return null;
  const showLegendIndices = ArrayUtils.range(numDays, Math.floor(numDays / NUM_LABELS));
  const allIndices = ArrayUtils.range(numDays);
  return (
    <div className="flex flex-row w-full text-xs translate-x-12">
      {allIndices.map((i) => (
          <span className="flex-shrink-0 flex-1 overflow-visible">
            {showLegendIndices.includes(i) ? format(daysInInterval[i], 'dd/MM') : ''}
          </span>
      ))}
    </div>
  );
}