import type { Meta } from "@storybook/react";

import ChallengeSummaryItem from ".";
import {
  Achievement,
  ChallengeMode,
  ChallengePeriod,
  ChallengeTargetUnit,
} from "../../../types/Achievement";
import { addDays, startOfWeek } from "date-fns";

const meta: Meta<typeof ChallengeSummaryItem> = {
  title: "Component/ChallengeSummary/ChallengeSummaryItem",
  component: ChallengeSummaryItem,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    challenge: {
      id: "42",
      name: "Test challenge",
      unit: ChallengeTargetUnit.Unit,
      description: "",
      target: 42,
      mode: ChallengeMode.GreaterThanTarget,
      period: ChallengePeriod.Daily,
    },
    achievements: [],
  },
};

export default meta;
export const NoAchievements = (
  args: Meta<typeof ChallengeSummaryItem>["args"]
) => {
  return (
    <ChallengeSummaryItem challenge={args!.challenge!} achievements={[]} />
  );
};
const weekStart = startOfWeek(Date.now());
const wednesday = addDays(weekStart, 3).getTime();
const friday = addDays(weekStart, 5).getTime();

export const WithAchievements = (
  args: Meta<typeof ChallengeSummaryItem>["args"]
) => {
  const mockAchievements: Achievement[] = [
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: wednesday,
      value: 10,
    },
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: friday,
      value: 4,
    },
  ];
  return (
    <ChallengeSummaryItem
      challenge={args!.challenge!}
      achievements={mockAchievements}
    />
  );
};
export const WithAchievementsOverflown = (
  args: Meta<typeof ChallengeSummaryItem>["args"]
) => {
  const mockAchievements: Achievement[] = [
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: wednesday,
      value: 42,
    },
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: friday,
      value: 42,
    },
  ];
  return (
    <ChallengeSummaryItem
      challenge={args!.challenge!}
      achievements={mockAchievements}
    />
  );
};

export const ReversedChallenge = (
  args: Meta<typeof ChallengeSummaryItem>["args"]
) => {
  const mockAchievements: Achievement[] = [
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: wednesday,
      value: 1,
    },
    {
      id: "1",
      completedChallengeIds: [],
      details: "a1",
      date: friday,
      value: 1,
    },
  ];
  return (
    <ChallengeSummaryItem
      challenge={{ ...args!.challenge!, mode: ChallengeMode.LessThanTarget }}
      achievements={mockAchievements}
    />
  );
};
