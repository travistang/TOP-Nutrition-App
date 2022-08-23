import classNames from "classnames";
import { format } from "date-fns";
import React from "react";
import { DayMarker, DayMarkerType } from "../../types/Calendar";

type Props = {
  date: Date;
  selected?: boolean;
  marker?: DayMarker;
  onSelect: () => void;
};

export default function DayCell({ date, selected, onSelect, marker }: Props) {
  return (
    <span
      className={classNames(
        "relative rounded-full aspect-square flex items-center justify-center text-sm",
        selected ? "font-bold bg-blue-400 text-gray-100" : "text-gray-600 opacity-80",
      )}
      style={marker?.type === DayMarkerType.Highlight ? { backgroundColor: marker.color } : {}}
      onClick={onSelect}
    >
      {format(date, "d")}
      {
        selected && (
          <div className="absolute bottom-0.5 w-1 rounded-full h-1 bg-gray-200" />
        )
      }
    </span>
  );
}
