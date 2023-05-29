import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum CardioExerciseType {
  Running = "running",
  Bouldering = "bouldering",
  Hiking = "hiking",
}

export const CardioExerciseTypeIcon: Record<CardioExerciseType, IconProp> = {
  [CardioExerciseType.Bouldering]: "shoe-prints",
  [CardioExerciseType.Running]: "person-running",
  [CardioExerciseType.Hiking]: "person-hiking",
};

export type RunningExerciseRecord = {
  type: CardioExerciseType.Running;
  date: number;
  durationMinutes: number;
  distanceKm: number;
  remark: string;
};

export type BoulderingExerciseRecord = {
  type: CardioExerciseType.Bouldering;
  date: number;
  durationMinutes: number;
  remark: string;
};

export type HikingExerciseRecord = {
  type: CardioExerciseType.Hiking;
  date: number;
  durationMinutes: number;
  gtx?: Blob;
  remark: string;
  elevation: number;
  tripName: string;
};

export type CardioExercise =
  | RunningExerciseRecord
  | BoulderingExerciseRecord
  | HikingExerciseRecord;
