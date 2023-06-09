import React, { useState } from "react";
import Modal from "../../Modal";
import { GPX } from "../../../domain/GPX";
import GPXMapView from "./GPXMapView";
import GPXElevationChart from "./GPXElevationChart";
import GPXStatistics from "./GPXStatistics";

type Props = {
  opened: boolean;
  onClose: () => void;
  gpx: GPX;
};
export default function GPXDetailViewModal({
  opened,
  onClose,
  gpx,
}: Props) {
  const [inspectingPointIndex, setInspectingPointIndex] = useState<number>(-1);
  return (
    <Modal opened={opened} onClose={onClose} label="GPX Details">
      <GPXMapView
        inspectingPointIndex={inspectingPointIndex}
        onInspectPointIndex={setInspectingPointIndex}
        gpx={gpx}
        className="rounded-lg w-full"
      />
      <GPXElevationChart
        inspectPointAtIndex={inspectingPointIndex}
        onInspectPointAtIndex={setInspectingPointIndex}
        gpx={gpx}
      />
      <GPXStatistics gpx={gpx} className="w-full" />
    </Modal>
  );
}
