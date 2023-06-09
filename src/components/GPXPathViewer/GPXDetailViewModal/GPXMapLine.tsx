import React, { useMemo } from "react";
import { LatLng } from "leaflet";
import { Polyline, useMapEvent } from "react-leaflet";
import { GPX, GPXPoint } from "../../../domain/GPX";
import { getColorBySegment, rgbVecToString } from "../../../domain/GPX/colors";

type Props = {
  gpx: GPX;
  onInspectPointIndex: (index: number) => void;
};

const getClosestPointTo = (latlng: LatLng, positions: GPXPoint[], thresholdMeter = 50) => {
  let minDist = Infinity;
  let index = -1;
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];
    const dist = latlng.distanceTo([position.lat, position.lon]);
    if (dist < minDist) {
      index = i;
      minDist = dist;
    }
  }
  if (minDist > thresholdMeter) return null;
  return index;
}
export default function GPXMapLine({ gpx, onInspectPointIndex }: Props) {
  const positions = useMemo(() => gpx.points, [gpx]);
  useMapEvent('click', (event) => {
    const clickedAt = event.latlng;
    const closestPositionIndex = getClosestPointTo(clickedAt, positions);
    if (closestPositionIndex !== null) {
      onInspectPointIndex(closestPositionIndex);
    }
  });

  return (
    <>
      {positions.map((position, i) =>
        i === positions.length - 1 ? null : (
          <Polyline
            key={`${i}-${position.lat}-${position.lon}-${position.lat}-${position.lon}`}
            color={rgbVecToString(
              getColorBySegment(position, positions[i + 1])
            )}
            positions={[
              [position.lat, position.lon],
              [positions[i + 1].lat, positions[i + 1].lon],
            ]}
          />
        )
      )}
    </>
  );
}
