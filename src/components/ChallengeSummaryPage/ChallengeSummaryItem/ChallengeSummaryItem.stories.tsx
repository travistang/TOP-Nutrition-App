import type { Meta } from "@storybook/react";

import ChallengeSummaryItem from ".";
import { ChallengeMode, ChallengePeriod } from "../../../types/Achievement";

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
