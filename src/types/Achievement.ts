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
};

export type Achievement = {
  id: string;
  details: string;
  date: number;
  completedChallengeIds: string[];
  value: number;
};
