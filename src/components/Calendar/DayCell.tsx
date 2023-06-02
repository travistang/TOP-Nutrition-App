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

type MarkerDotProps = {
  marker?: DayMarker;
};
export const MarkerDot = ({ marker }: MarkerDotProps) => {
  const markerTypeWithDots = [DayMarkerType.Dot, DayMarkerType.HighlightAndDot];
  if (!marker || !markerTypeWithDots.includes(marker.type)) {
    return null;
  }

  const backgroundColor =
    marker!.type === DayMarkerType.Dot
      ? marker.color
      : (marker as Extract<DayMarker, { type: DayMarkerType.HighlightAndDot }>)
          .dotColor;

  return (
    <div
      className="rounded-full w-1 h-1 absolute translate-y-2"
      style={{ backgroundColor }}
    />
  );
};

const computeHighlightStyle = (marker?: DayMarker) => {
  if (marker?.type === DayMarkerType.Highlight) {
    return { backgroundColor: marker.color };
  }

  if (marker?.type === DayMarkerType.HighlightAndDot) {
    return { backgroundColor: marker.highlightColor };
  }
  return {};
};

export default function DayCell({
  date,
  selected,
  onSelect,
  ringConfig,
  marker,
}: Props) {
  return (
    <span
      className={classNames(
        "relative rounded-full aspect-square flex items-center justify-center text-sm opacity-80",
        selected ? "font-bold text-blue-400" : "text-gray-600 "
      )}
      style={computeHighlightStyle(marker)}
      onClick={onSelect}
    >
      {format(date, "d")}
      <MarkerDot marker={marker} />
      {ringConfig && <Ring ringConfig={ringConfig} />}
    </span>
  );
}
