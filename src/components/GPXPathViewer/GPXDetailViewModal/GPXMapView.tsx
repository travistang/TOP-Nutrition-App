import React from "react";
import { Circle, MapContainer, TileLayer } from "react-leaflet";

import { GPX, computeGpxViewport } from "../../../domain/GPX";
import GPXMapLine from "./GPXMapLine";
import GPXMapUserLocationPin from "./GPXMapUserLocationPin";

type Props = {
  className?: string;
  gpx: GPX;
  inspectingPointIndex: number;
  onInspectPointIndex: (index: number) => void;

};
export default function GPXMapView({
  className,
  gpx,
  inspectingPointIndex,
  onInspectPointIndex,
}: Props) {
  const viewport = computeGpxViewport(gpx);
  const inspectingPoint = gpx.points[inspectingPointIndex ?? -1] ?? null;
  return (
    <MapContainer
      zoomControl={false}
      center={viewport.center}
      zoom={12}
      className={className}
      style={{ height: "35vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GPXMapLine
        gpx={gpx}
        onInspectPointIndex={onInspectPointIndex}
      />
      <GPXMapUserLocationPin />
      {inspectingPoint && (
        <Circle
          center={[inspectingPoint.lat, inspectingPoint.lon]}
          pathOptions={{ color: 'orange', fillColor: 'orange' }}
          radius={60}
        />
      )}
    </MapContainer>
  );
}
