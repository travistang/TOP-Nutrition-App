import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  unit: string;
};

export type Achievement = {
  id: string;
  details: string;
  date: number;
  completedChallengeIds: string[];
  value: number;
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
