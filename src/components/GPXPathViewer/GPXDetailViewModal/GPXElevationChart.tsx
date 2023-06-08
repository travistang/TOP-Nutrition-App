import React, { useMemo, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { GPX, computeAccumulativeDistance } from "../../../domain/GPX";
import { MarcoNutritionColor } from "../../../types/Nutrition";

type Props = {
  gpx: GPX;
  inspectPointAtIndex: number;
  onInspectPointAtIndex: (index: number) => void;
};
const LineOptions = {
  responsive: true,
  borderJoinStyle: "miter",
  borderCapStyle: "butt",
  animation: { duration: 0 },
  plugins: { tooltip: { enabled: false }, legend: { display: false } },
};

const createDatasetForHighlightPoint = (
  elevations: (number | null)[],
  index: number,
  color: string,
  label: string
) => {
  const data = Array(elevations.length).fill(null);
  data[index] = elevations[index];
  return {
    label,
    borderColor: color,
    data,
  };
};

export default function GPXElevationChart({
  gpx,
  inspectPointAtIndex,
  onInspectPointAtIndex,
}: Props) {
  const chartRef = useRef<ChartJS>(null!);
  const elevations = useMemo(() => gpx.points.map((p) => p.elevation), [gpx]);
  const accumulatedDistances = useMemo(
    () =>
      computeAccumulativeDistance(gpx).map(
        (cumsum) => `${cumsum.toFixed(1)} km`
      ),
    [gpx]
  );

  if (elevations.length === 0) return null;
  const lineData = {
    labels: accumulatedDistances,
    datasets: [
      {
        label: "Elevation",
        data: elevations,
        pointRadius: 1,
        borderColor: MarcoNutritionColor.fat,
      },
      ...(inspectPointAtIndex !== null
        ? [
            createDatasetForHighlightPoint(
              elevations,
              inspectPointAtIndex,
              "blue",
              "Inspect"
            ),
          ]
        : []),
    ],
  };

  const onChartClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;
    if (!chart) return;
    const element = getElementAtEvent(chart, e);
    if (element[0]?.index !== undefined) {
      onInspectPointAtIndex(element[0]?.index ?? -1);
    }
  };
  return (
    <Chart
      ref={chartRef}
      type="line"
      onClick={onChartClick}
      height={72}
      data={lineData}
      options={LineOptions}
    />
  );
}
