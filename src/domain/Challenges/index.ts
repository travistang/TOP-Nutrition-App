import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isFuture,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  Achievement,
  Challenge,
  ChallengeMode,
  ChallengePeriod,
  ChallengeStatus,
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

const isDateInCurrentChallengePeriod = (
  period: ChallengePeriod,
  date: number
) => {
  const now = Date.now();
  switch (period) {
    case ChallengePeriod.Daily:
      return isSameDay(date, now);
    case ChallengePeriod.Monthly:
      return isSameMonth(date, now);
    default:
      return isSameWeek(date, now);
  }
};

export const getChallengePeriodOnDay = (
  period: ChallengePeriod,
  date: number
): [number, number] => {
  switch (period) {
    case ChallengePeriod.Daily:
      return [startOfDay(date).getTime(), endOfDay(date).getTime()];
    case ChallengePeriod.Monthly:
      return [startOfMonth(date).getTime(), endOfMonth(date).getTime()];
    case ChallengePeriod.Weekly:
      return [startOfWeek(date).getTime(), endOfWeek(date).getTime()];
  }
};
export const computeChallengeStatus = (
  challenge: Challenge,
  achievements: Achievement[],
  date: number
): ChallengeStatus => {
  const { target, mode, period } = challenge;
  const shouldAchieveGreaterThanTarget =
    mode === ChallengeMode.GreaterThanTarget;
  const dateInCurrentPeriod = isDateInCurrentChallengePeriod(period, date);
  const isChallengePeriodInFuture = isFuture(date) && !dateInCurrentPeriod;
  if (isChallengePeriodInFuture) {
    return ChallengeStatus.NotStarted;
  }

  const achievedValue = getTotalAchievedValue(achievements);
  const valueGreaterThanTarget = achievedValue >= target;

  if (dateInCurrentPeriod) {
    if (!shouldAchieveGreaterThanTarget && valueGreaterThanTarget)
      return ChallengeStatus.Failed;
    if (shouldAchieveGreaterThanTarget && valueGreaterThanTarget)
      return ChallengeStatus.Completed;
    return ChallengeStatus.Ongoing;
  }

  if (
    (shouldAchieveGreaterThanTarget && !valueGreaterThanTarget) ||
    (!shouldAchieveGreaterThanTarget && valueGreaterThanTarget)
  ) {
    return ChallengeStatus.Failed;
  }
  return ChallengeStatus.Completed;
};
