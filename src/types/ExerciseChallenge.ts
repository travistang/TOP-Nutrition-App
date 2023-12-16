import { Exercise } from "./Exercise";

export enum ExerciseChallengeType {
  NumberOfSets,
  SetsOfWeight,
  SetsOfRepetition,
  TotalRepetitions,
  TotalVolume,
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
  Daily,
  Weekly,
  Monthly,
}

export enum ExerciseChallengeMode {
  GreaterThanOrEqualTo,
  GreaterThan,
  LessThanOrEqualTo,
  LessThan,
}
export type ExerciseConstraint = Partial<Exercise> & { name: string };
export type ExerciseChallenge = {
  id: string;
  exerciseConstraint: ExerciseConstraint;
  mode: ExerciseChallengeMode;
  type: ExerciseChallengeType;
  typeSpecificValue?: number;
  target: number;
};
