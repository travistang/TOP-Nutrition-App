import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { BodyPart, Equipment, ExerciseMode } from "./Exercise";

export enum ExerciseChallengeType {
  NumberOfSets = "number_of_sets",
  SetsOfWeight = "sets_of_weight",
  SetsOfRepetition = "sets_of_repetition",
  TotalRepetitions = "total_repetitions",
  TotalVolume = "total_volume",
}

export type ExerciseChallengeTypeConfig = {
  name: string;
  description: string;
  hasTypeSpecificValue?: boolean;
};
export const CHALLENGE_TYPE_CONFIG: Record<
  ExerciseChallengeType,
  ExerciseChallengeTypeConfig
> = {
  [ExerciseChallengeType.NumberOfSets]: {
    name: "Number of sets",
    description: "Target number of sets done within given interval",
  },
  [ExerciseChallengeType.SetsOfWeight]: {
    name: "Number of sets with weight",
    description: "Target number of sets done using at least X kg of weights",
    hasTypeSpecificValue: true,
  },
  [ExerciseChallengeType.SetsOfRepetition]: {
    name: "Number of sets with repetition",
    description:
      "Target number of sets done with at least X number of repetitions",
    hasTypeSpecificValue: true,
  },
  [ExerciseChallengeType.TotalRepetitions]: {
    name: "Total number of repetitions",
    description: "Target number of repetitions done within given interval",
  },
  [ExerciseChallengeType.TotalVolume]: {
    name: "Total number of volume",
    description: "Target amount of volume done within given interval",
  },
};

export enum ExerciseChallengeInterval {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export enum ExerciseChallengeMode {
  GreaterThanOrEqualTo = "geq",
  GreaterThan = "gt",
  LessThanOrEqualTo = "leq",
  LessThan = "le",
}
export type ExerciseChallengeModeDetails = {
  description: string;
  icon: IconProp;
};
export const CHALLENGE_MODE_DETAILS: Record<ExerciseChallengeMode, IconProp> = {
  [ExerciseChallengeMode.GreaterThanOrEqualTo]: "greater-than-equal",
  [ExerciseChallengeMode.GreaterThan]: "greater-than",
  [ExerciseChallengeMode.LessThanOrEqualTo]: "less-than-equal",
  [ExerciseChallengeMode.LessThan]: "less-than",
};
export type ExerciseConstraint = {
  name: string;
  modes: ExerciseMode[];
  workingBodyParts: BodyPart[];
  equipments: Equipment[];
};

export type ExerciseChallenge = {
  id: string;
  name: string;
  exerciseConstraint: ExerciseConstraint;
  mode: ExerciseChallengeMode;
  type: ExerciseChallengeType;
  interval: ExerciseChallengeInterval;
  typeSpecificValue?: number;
  target: number;
};

export const DEFAULT_EXERCISE_CHALLENGE: ExerciseChallenge = {
  id: "",
  name: "",
  exerciseConstraint: {
    name: "",
    modes: [],
    workingBodyParts: [],
    equipments: [],
  },
  mode: ExerciseChallengeMode.GreaterThan,
  type: ExerciseChallengeType.NumberOfSets,
  interval: ExerciseChallengeInterval.Weekly,
  typeSpecificValue: 0,
  target: 0,
};
