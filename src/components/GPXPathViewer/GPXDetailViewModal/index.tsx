import React, { useMemo } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import Modal from "../../Modal";
import { GPX, computeGpxViewport } from "../../../domain/GPX";

type Props = {
  opened: boolean;
  onClose: () => void;
  gpx: GPX;
};
export default function GPXDetailViewModal({ opened, onClose, gpx }: Props) {
  const viewport = useMemo(() => computeGpxViewport(gpx), [gpx]);
  const positions = useMemo(() => {
    return gpx.points.map((pt) => [pt.lat, pt.lon] as [number, number]);
  }, [gpx]);
  return (
    <Modal opened={opened} onClose={onClose} label="GPX Details">
      <MapContainer
        zoomControl={false}
        center={viewport.center}
        bounds={[
          [viewport.bounds.x[0], viewport.bounds.y[0]],
          [viewport.bounds.x[1], viewport.bounds.y[1]],
        ]}
        className="rounded-lg w-full"
        style={{ height: "50vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline color="red" positions={positions} />
      </MapContainer>
    </Modal>
  );
}
