import React from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { DayMarker, DayMarkerType } from "../../types/Calendar";
import Ring, { RingConfig } from "./Ring";

type Props = {
  date: Date;
  selected?: boolean;
  marker?: DayMarker;
  ringConfig?: RingConfig;
  onSelect: () => void;
};

export default function DayCell({ date, selected, onSelect, ringConfig, marker }: Props) {
  return (
    <span
      className={classNames(
        "relative rounded-full aspect-square flex items-center justify-center text-sm opacity-80",
        selected ? "font-bold text-blue-400" : "text-gray-600 ",
      )}
      style={marker?.type === DayMarkerType.Highlight ? { backgroundColor: marker.color } : {}}
      onClick={onSelect}
    >
      {format(date, "d")}
      {ringConfig && <Ring ringConfig={ringConfig} />}
    </span>
  );
}
