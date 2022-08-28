import { differenceInSeconds } from "date-fns/esm";
import React from "react";

type Props = {
  currentSetTime: number;
  nextSetTime: number;
};
export default function RestTimeText({ currentSetTime, nextSetTime }: Props) {
  const diffInSeconds = differenceInSeconds(nextSetTime, currentSetTime);
  const shouldShowInMinutes = diffInSeconds > 60 * 3;
  const text = !shouldShowInMinutes
    ? `${diffInSeconds} seconds`
    : `${(diffInSeconds / 60).toFixed(1)} minutes`;
  return (
    <div className="grid grid-cols-12 gap-1">
      <span className="text-xs text-opacity-70 col-end-13 col-start-3 -my-1">
        + {text}
      </span>
    </div>
  );
}
