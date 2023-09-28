import { Achievement, Challenge, ChallengeMode } from "../../types/Achievement";
import NumberUtils from "../../utils/Number";

export const getTotalAchievedValue = (achievements: Achievement[]) => {
  return NumberUtils.sum(
    ...achievements.map((achievement) => achievement.value)
  );
};

export const getAchievementProgressScore = (
  challenge: Challenge,
  achievements: Achievement[]
): number => {
  const currentValue = getTotalAchievedValue(achievements);
  if (challenge.mode === ChallengeMode.GreaterThanTarget) {
    return currentValue;
  }

  return Math.max(0, challenge.target - currentValue);
};
