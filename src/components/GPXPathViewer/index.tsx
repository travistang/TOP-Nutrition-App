import React, { useMemo, useState } from "react";
import { GPX, computeSVGPathForGPX } from "../../domain/GPX";
import GPXDetailViewModal from "./GPXDetailViewModal";

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
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <GPXDetailViewModal
          gpx={gpx}
          opened={zoomed}
          onClose={() => setZoomed(false)}
        />
      </div>
      <div onClick={toggleZoom} className="relative">
        <svg
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
    </>
  );
}
