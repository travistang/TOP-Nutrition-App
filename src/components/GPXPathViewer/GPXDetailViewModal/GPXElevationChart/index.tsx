import React, { useMemo, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { GPX, computeAccumulativeDistance } from "../../../../domain/GPX";
import { MarcoNutritionColor } from "../../../../types/Nutrition";
import useElevationChartOption from "./useElevationChartOption";

type Props = {
  gpx: GPX;
  inspectPointAtIndex: number;
  onInspectPointAtIndex: (index: number) => void;
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
  const options = useElevationChartOption({
    elevations,
    inspectPointIndex: inspectPointAtIndex,
  });
  if (elevations.length === 0) return null;
  const lineData = {
    labels: accumulatedDistances,
    datasets: [
      {
        label: "Elevation",
        data: elevations,
        pointRadius: 1,
        lineTension: 0.8,
        borderColor: MarcoNutritionColor.fat,
      }
    ]
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
      height={96}
      data={lineData}
      options={options}
    />
  );
}
