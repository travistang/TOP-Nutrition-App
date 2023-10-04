import { useLiveQuery } from "dexie-react-hooks";
import { createContext } from "react";
import achievementDatabase from "../../database/AchievementDatabase";
import {
  Achievement,
  Challenge,
  DEFAULT_CHALLENGE,
} from "../../types/Achievement";

type ChallengeContextValue = {
  challenge: Challenge;
  achievements: Achievement[];
};
const defaultChallengeContextValue: ChallengeContextValue = {
  challenge: DEFAULT_CHALLENGE,
  achievements: [],
};
export const challengeContext = createContext(defaultChallengeContextValue);

type Props = {
  date?: number;
  challenge: Challenge;
  children?: React.ReactNode;
};
export default function ChallengeContextProvider({
  date = Date.now(),
  challenge,
  children,
}: Props) {
  const achievementsInPeriod = useLiveQuery(() => {
    return achievementDatabase.getAchievementsOfChallengeInPeriodAtDate(
      challenge,
      date
    );
  }, [challenge, date]);
  const value: ChallengeContextValue = {
    challenge,
    achievements: achievementsInPeriod ?? [],
  };

  return (
    <challengeContext.Provider value={value}>
      {children}
    </challengeContext.Provider>
  );
}
