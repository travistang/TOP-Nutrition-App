import React from 'react';
import classNames from 'classnames';
import { GPX, computeGpxStatistics } from '../../../domain/GPX';
import ScalarWidget from '../../Widgets/ScalarWidget';

type Props = {
  gpx: GPX;
  className?: string;
}
export default function GPXStatistics({ className, gpx}: Props) {
  const statistics = computeGpxStatistics(gpx);
  return (
    <div className={classNames("grid grid-cols-2 gap-2", className)}>
      <ScalarWidget label="Distance" value={statistics.lengthKm} unit="km" />
      <ScalarWidget label="Highest point" value={statistics.maxElevation} unit="hm" />
      <ScalarWidget label="Elevation Gain" value={statistics.elevationGain} unit="hm" className="col-start-1" />
      <ScalarWidget label="Elevation Loss" value={statistics.elevationLoss} unit="hm" />
    </div>
  )
}