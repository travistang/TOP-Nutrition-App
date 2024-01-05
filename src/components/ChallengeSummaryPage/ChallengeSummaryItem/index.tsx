import classNames from "classnames";
import { useMemo } from "react";
import { computeChallengeStatus } from "../../../domain/Challenges";
import {
  Achievement,
  Challenge,
  ChallengePeriod,
} from "../../../types/Achievement";
import DailyAchievementOverview from "./AchievementOverview/DailyAchievementOverview";
import WeeklyAchievementOverview from "./AchievementOverview/WeeklyAchievementOverview";
import ChallengeStatusIcon from "./ChallengeStatusIcon";
import ChallengeSummaryScore from "./ChallengeSummaryScore";

type Props = {
  className?: string;
  onClick?: () => void;
  challenge: Challenge;
  achievements: Achievement[];
};
export default function ChallengeSummaryItem({
  challenge,
  onClick,
  achievements,
  className,
}: Props) {
  const status = useMemo(
    () => computeChallengeStatus(challenge, achievements, Date.now()),
    [challenge, achievements]
  );
  return (
    <div
      onClick={onClick}
      className={classNames(
        "grid grid-cols-[48px_repeat(4,1fr)_auto] gap-2 rounded-lg bg-gray-300 px-2 py-1",
        className
      )}
    >
      <ChallengeStatusIcon
        status={status}
        className="aspect-square h-12 row-start-1 row-span-2 col-start-1 col-span-1"
      />

      <div className="row-start-1 row-span-2 col-start-2 col-span-4 flex flex-col gap-1 items-stretch">
        <div className="font-bold text-sm overflow-hidden text-ellipsis flex items-center gap-1 ">
          <span className="flex-1 font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            {challenge.name}
          </span>
        </div>
        <div>
          {challenge.period === ChallengePeriod.Daily && (
            <DailyAchievementOverview
              challenge={challenge}
              achievements={achievements}
            />
          )}

          {challenge.period === ChallengePeriod.Weekly && (
            <WeeklyAchievementOverview
              challenge={challenge}
              achievements={achievements}
            />
          )}
        </div>
      </div>
      <ChallengeSummaryScore
        achievements={achievements}
        challenge={challenge}
        className="col-span-1 row-span-2 row-start-1"
      />
    </div>
  );
}
