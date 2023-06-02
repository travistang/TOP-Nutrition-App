import { XMLParser } from "fast-xml-parser";
import NumberUtils from "../../utils/Number";
import ArrayUtils from "../../utils/Array";

export type RawGPXTrackPoint = {
  "@_lat": number;
  "@_lon": number;
  ele?: number;
};

export type RawGPXFile = {
  gpx: {
    trk: {
      name: string;
      trkseg: {
        trkpt: RawGPXTrackPoint[];
      };
    };
  };
};

export type GPXPoint = {
  lat: number;
  lon: number;
  elevation: number | null;
};

export type GPX = {
  name: string;
  points: GPXPoint[];
};
export type GPXStatistics = {
  minElevation: number | null;
  maxElevation: number | null;
  lengthKm: number;
  elevationGain: number;
  elevationLoss: number;
};

export const gpxToPath = (rawGpx: RawGPXFile): GPX => {
  return {
    name: rawGpx.gpx.trk.name,
    points: rawGpx.gpx.trk.trkseg.trkpt.map((point) => ({
      lat: parseFloat(point["@_lat"].toString()),
      lon: parseFloat(point["@_lon"].toString()),
      elevation: point.ele ?? null,
    })),
  };
};

const distance = (from: GPXPoint, to: GPXPoint) => {
  const { lat: lat1, lon: lon1 } = from;
  const { lat: lat2, lon: lon2 } = to;

  // https://stackoverflow.com/a/21623206
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const parseGPXFile = async (blob: Blob) => {
  const text = await blob.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
  });
  const content = parser.parse(text, true) as RawGPXFile;
  if (!content?.gpx?.trk?.trkseg?.trkpt?.length) {
    throw new Error("Invalid or empty GPX file");
  }

  return gpxToPath(content);
};

export const DEFAULT_GPX_STATISTICS: GPXStatistics = {
  minElevation: null,
  maxElevation: null,
  lengthKm: 0,
  elevationGain: 0,
  elevationLoss: 0,
};

export const computeGpxStatistics = (gpx: GPX): GPXStatistics => {
  const statistics: GPXStatistics = { ...DEFAULT_GPX_STATISTICS };

  gpx.points.forEach((point, i, points) => {
    const currentElevation = point.elevation;
    const nextPoint = points[i + 1];
    if (currentElevation !== null) {
      if (
        statistics.minElevation === null ||
        currentElevation < statistics.minElevation
      ) {
        statistics.minElevation = currentElevation;
      }

      if (
        statistics.maxElevation === null ||
        currentElevation > statistics.maxElevation
      ) {
        statistics.maxElevation = currentElevation;
      }

      const nextPointElevation = nextPoint?.elevation;
      if (!Number.isFinite(nextPointElevation)) return;
      const elevationDifference = nextPointElevation! - currentElevation;
      if (elevationDifference < 0) {
        statistics.elevationLoss -= elevationDifference;
      } else {
        statistics.elevationGain += elevationDifference;
      }
    }

    if (nextPoint) {
      statistics.lengthKm += distance(point, nextPoint);
    }
  });
  return statistics;
};

export const computeSVGPathForGPX = (gpx: GPX) => {
  if (gpx.points.length <= 1) return "";
  const normalizedRange = { min: 0, max: 100 };
  const [xs, ys] = [
    NumberUtils.normalize(normalizedRange, ...gpx.points.map((p) => p.lat)),
    NumberUtils.normalize(normalizedRange, ...gpx.points.map((p) => p.lon)),
  ];

  const int = (n: number) => Math.round(n);
  const command = (cmd: "M" | "L", point: [number, number]) =>
    ` ${cmd} ${int(point[0])} ${int(point[1])}`;

  let path = command("M", [xs[0], ys[0]]);

  ArrayUtils.zip(xs, ys)
    .slice(1)
    .forEach((point, i) => {
      path += command("L", point);
    });

  return path;
};
