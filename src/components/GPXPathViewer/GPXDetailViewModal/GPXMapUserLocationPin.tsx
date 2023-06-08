import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Circle, Polyline } from "react-leaflet";
import NumberUtils from "../../../utils/Number";

const LINE_HEADING_LENGTH = 10;
const LINE_HEADING_HALF_ANGLE = 30;
type Coordinates = [number, number];

const computeLineHeadingCoordinates = (
  position: GeolocationPosition
): [[Coordinates, Coordinates], [Coordinates, Coordinates]] | null => {
  const { heading, latitude, longitude } = position.coords;
  if (heading === null) return null;
  const leftLineHeading = NumberUtils.degToRad(
    NumberUtils.normalizeDegree(heading - LINE_HEADING_HALF_ANGLE)
  );
  const rightLineHeading = NumberUtils.degToRad(
    NumberUtils.normalizeDegree(heading + LINE_HEADING_HALF_ANGLE)
  );
  const leftLineLat =
    latitude + LINE_HEADING_LENGTH * Math.sin(leftLineHeading);
  const leftLineLng =
    longitude + LINE_HEADING_LENGTH * Math.cos(leftLineHeading);

  const rightLineLat =
    latitude + LINE_HEADING_LENGTH * Math.sin(rightLineHeading);
  const rightLineLng =
    longitude + LINE_HEADING_LENGTH * Math.cos(rightLineHeading);

  return [
    [
      [latitude, longitude],
      [leftLineLat, leftLineLng],
    ],
    [
      [latitude, longitude],
      [rightLineLat, rightLineLng],
    ],
  ];
};

export default function GPXMapUserLocationPin() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  useEffect(() => {
    const locationWatcher = window.navigator.geolocation.watchPosition(
      setUserLocation,
      () => toast.error("Unable to get your location")
    );
    return () => window.navigator.geolocation.clearWatch(locationWatcher);
  }, []);
  if (!userLocation) return null;

  const inverseAccuracyRatio = (100 - userLocation.coords.accuracy) / 100;
  const [circleRadius] = NumberUtils.interpolateVector(
    [40],
    [500],
    inverseAccuracyRatio
  );

  const lineHeadingCoords = computeLineHeadingCoordinates(userLocation);
  return (
    <>
      {lineHeadingCoords && (
        <>
          <Polyline positions={lineHeadingCoords[0]} color="blue" />
          <Polyline positions={lineHeadingCoords[1]} color="blue" />
        </>
      )}
      <Circle
        center={[userLocation.coords.latitude, userLocation.coords.longitude]}
        radius={circleRadius}
      />
    </>
  );
}
