import React, { useMemo } from "react";
import { Polyline } from "react-leaflet";
import { GPX } from "../../../domain/GPX";
import { getColorBySegment, rgbVecToString } from "../../../domain/GPX/colors";

type Props = {
  gpx: GPX;
};

export default function GPXMapLine({ gpx }: Props) {
  const positions = useMemo(() => gpx.points, [gpx]);

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
