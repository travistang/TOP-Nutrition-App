import React, { useEffect, useState } from "react";
import { CardioExercise, CardioExerciseType } from "../../types/CardioExercise";
import GPXInput from "../Input/GPXInput";
import { GPX, parseGPXFile } from "../../domain/GPX";
import toast from "react-hot-toast";

const EXERCISE_WITH_GPX_FIELDS: CardioExerciseType[] = [
  CardioExerciseType.Hiking,
  CardioExerciseType.Running,
];
type CardioExerciseWithGpx = Extract<CardioExercise, { gpx?: Blob }>;
type Props = {
  record: CardioExercise;
  className?: string;
  onChange: (record: CardioExercise) => void;
};

export default function GPXFilePicker({ record, className, onChange }: Props) {
  const [gpx, setGpx] = useState<GPX | null>(null);
  const hasGpxFieldInRecord = EXERCISE_WITH_GPX_FIELDS.includes(record.type);

  useEffect(() => {
    const gpxFile = (record as CardioExerciseWithGpx).gpx;
    if (!gpxFile) {
      setGpx(null);
      return;
    }
    parseGPXFile(gpxFile)
      .then(setGpx)
      .catch(() => {
        toast.error("Failed to parse GPX File");
      });
  }, [record]);

  if (!hasGpxFieldInRecord) return null;

  const onSelectGpx = (gpx?: Blob) => {
    onChange({ ...record, gpx } as CardioExerciseWithGpx);
  };

  return (
    <GPXInput
      gpx={gpx ?? undefined}
      className={className}
      onSelectGpx={onSelectGpx}
    />
  );
}
