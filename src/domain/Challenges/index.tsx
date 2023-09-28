import {
  Achievement,
  Challenge,
  ChallengeMode,
  ChallengeTargetUnit,
} from "../../types/Achievement";
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

export const isChallengeTargetUnitInteger = (
  unit: ChallengeTargetUnit
): boolean => {
  switch (unit) {
    case ChallengeTargetUnit.Person:
    case ChallengeTargetUnit.Unit:
      return true;
    default:
      return false;
  }
};

export const getUnitPlural = (unit: ChallengeTargetUnit): string => {
  if (isChallengeTargetUnitInteger(unit)) return `${unit}s`;
  return unit;
};
