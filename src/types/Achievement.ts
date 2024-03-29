import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum ChallengeTargetUnit {
  Person = "person",
  Unit = "unit",
  g = "g",
  ml = "ml",
  kg = "kg",
}

export enum ChallengePeriod {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export enum ChallengeMode {
  GreaterThanTarget = "greater-than-target",
  LessThanTarget = "less-than-target",
}

export type Challenge = {
  id: string;
  name: string;
  description: string;
  target: number;
  period: ChallengePeriod;
  mode: ChallengeMode;
  endsAt?: number;
  unit: ChallengeTargetUnit;
};

export enum ChallengeStatus {
  Ongoing = "ongoing",
  Completed = "completed",
  Failed = "failed",
  NotStarted = "not-started",
}

export type Achievement = {
  id: string;
  details: string;
  date: number;
  completedChallengeIds: string[];
  value: number;
};

export const DEFAULT_CHALLENGE: Challenge = {
  id: "",
  name: "",
  description: "",
  target: 0,
  period: ChallengePeriod.Daily,
  mode: ChallengeMode.GreaterThanTarget,
  unit: ChallengeTargetUnit.Person,
};

export const DEFAULT_ACHIEVEMENT: Achievement = {
  id: "",
  completedChallengeIds: [],
  date: Date.now(),
  value: 0,
  details: "",
};

export const CHALLENGE_MODE_SETTINGS = [
  {
    value: ChallengeMode.GreaterThanTarget,
    icon: "greater-than-equal" as IconProp,
    label: "Greater than target",
  },
  {
    value: ChallengeMode.LessThanTarget,
    icon: "less-than" as IconProp,
    label: "Less than target",
  },
];
