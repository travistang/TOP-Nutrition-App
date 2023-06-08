import React, { useState } from "react";
import Modal from "../../Modal";
import { GPX } from "../../../domain/GPX";
import Button, { ButtonStyle } from "../../Input/Button";
import GPXMapView from "./GPXMapView";
import GPXElevationChart from "./GPXElevationChart";

type Props = {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
  gpx: GPX;
};
export default function GPXDetailViewModal({
  opened,
  onClose,
  onDelete,
  gpx,
}: Props) {
  const [inspectingPointIndex, setInspectingPointIndex] = useState<number>(-1);
  return (
    <Modal opened={opened} onClose={onClose} label="GPX Details">
      <GPXMapView
        inspectingPointIndex={inspectingPointIndex}
        gpx={gpx}
        className="rounded-lg w-full"
      />
      <GPXElevationChart
        inspectPointAtIndex={inspectingPointIndex}
        onInspectPointAtIndex={setInspectingPointIndex}
        gpx={gpx}
      />
      <div className="flex flex-nowrap justify-between py-2">
        <Button
          buttonStyle={ButtonStyle.BlockDanger}
          text="Delete"
          icon="trash"
          onClick={onDelete}
        />
      </div>
    </Modal>
  );
}
