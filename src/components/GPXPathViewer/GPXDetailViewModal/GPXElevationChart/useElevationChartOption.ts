import { useMemo } from 'react';
import NumberUtils from '../../../../utils/Number';

const BASE_OPTION = {
  responsive: true,
  animation: { duration: 0 },
   plugins: {
    tooltip: { enabled: false }, legend: { display: false },
    annotation: {
      annotations: {} as Record<string, any>
    }
  },
};
type CreateAnnotationsOption = {
  index: number;
  color: string;
  yMax: number;
  yMin: number;
  name: string;
  yValues: number[];
}
const createAnnotationsAtIndex = ({
  yValues,
  index,
  color,
  yMax,
  yMin,
  name,
}: CreateAnnotationsOption) => ({
  [`${name}-line-horizontal`]: {
    type: "line",
    borderColor: color,
    borderWidth: 2,
    xMax: yValues.length - 1,
    xMin: 0,
    xScaleID: "x",
    yMax: yValues[index],
    yMin: yValues[index],
    yScaleID: "y",
  },
  [`${name}-line`]: {
    type: "line",
    borderColor: color,
    borderWidth: 2,
    xMax: index,
    xMin: index,
    xScaleID: "x",
    yMax,
    yMin,
    yScaleID: "y",
  },
  [`${name}-point`]: {
    type: "point",
    backgroundColor: color,
    radius: 3,
    borderWidth: 0,
    xValue: index,
    xScaleID: "x",
    yValue: yValues[index],
    yScaleID: "y",
  }
});

type UseElevationChartOptionProps = {
  inspectPointIndex: number;
  elevations: (number | null)[];
}
const Y_AXIS_MARGIN = 100;
export default function useElevationChartOption({
  elevations,
  inspectPointIndex,
}: UseElevationChartOptionProps) {
  const yMax = useMemo(() => NumberUtils.max(...elevations) + Y_AXIS_MARGIN, [elevations]);
  const yMin = useMemo(() => NumberUtils.min(...elevations) - Y_AXIS_MARGIN, [elevations]);
  const finalOption = {
    ...BASE_OPTION,
    scales: {
      y: {
        min: yMin,
        max: yMax,
      },
    },
  };

  if (inspectPointIndex >= 0) {
    finalOption.plugins.annotation.annotations = {
      ...finalOption.plugins.annotation.annotations,
      ...createAnnotationsAtIndex({
        index: inspectPointIndex,
        yValues: elevations as number[],
        yMax,
        yMin,
        name: "inspect",
        color: "orange",
      }),
    };
  }
  return finalOption;
}