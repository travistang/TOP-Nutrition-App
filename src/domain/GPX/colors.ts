import { GPXPoint, slope } from ".";
import NumberUtils from "../../utils/Number";

type RGB = [number, number, number];

const SLOPE_COLOR_CONFIG = {
  min: {
    value: NumberUtils.degToRad(-70),
    color: [0, 255, 0],
  },
  max: {
    value: NumberUtils.degToRad(50),
    color: [255, 0, 0],
  },
};
export const getColorBySegment = (from: GPXPoint, to: GPXPoint): RGB => {
  const segmentSlope = slope(from, to);
  if (segmentSlope === null) {
    return [0, 0, 0];
  }
  const ratio = NumberUtils.ratioIn(
    SLOPE_COLOR_CONFIG.min.value,
    segmentSlope,
    SLOPE_COLOR_CONFIG.max.value
  );
  const clippedRatio = NumberUtils.clip(0, ratio, 1);
  const colorInterpolated = NumberUtils.interpolateVector(
    SLOPE_COLOR_CONFIG.min.color,
    SLOPE_COLOR_CONFIG.max.color,
    clippedRatio
  ) as RGB;
  return colorInterpolated;
};

export const rgbVecToString = (rgb: RGB): string => {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};
