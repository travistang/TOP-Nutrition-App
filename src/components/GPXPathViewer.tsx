import React, { useMemo, useState } from "react";
import { GPX, computeSVGPathForGPX } from "../domain/GPX";
import classNames from "classnames";

type Props = {
  gpx: GPX;
  className?: string;
};

export default function GPXPathViewer({ gpx, className }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const svgPath = useMemo(() => {
    return computeSVGPathForGPX(gpx);
  }, [gpx]);

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomed(!zoomed);
  };
  return (
    <div
      onClick={toggleZoom}
      className={classNames(
        zoomed
          ? "p-4 fixed inset-0 z-50 flex items-center justify-center bg-gray-100"
          : "contents"
      )}
    >
      <svg
        onClick={toggleZoom}
        viewBox="-10 -10 120 120"
        width="100%"
        height="100%"
        className={className}
        style={{ transform: "rotate(-80deg)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          style={{ strokeLinejoin: "round" }}
          stroke="black"
          strokeWidth={1}
          d={svgPath}
        />
      </svg>
    </div>
  );
}
