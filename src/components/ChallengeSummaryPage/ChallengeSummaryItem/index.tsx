import classNames from "classnames";
import {
  Achievement,
  Challenge,
  ChallengePeriod,
} from "../../../types/Achievement";
import DailyAchievementOverview from "./AchievementOverview/DailyAchievementOverview";
import WeeklyAchievementOverview from "./AchievementOverview/WeeklyAchievementOverview";
import ChallengeSummaryScore from "./ChallengeSummaryScore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
  challenge: Challenge;
  achievements: Achievement[];
};
export default function ChallengeSummaryItem({
  challenge,
  achievements,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        "grid grid-cols-6 gap-2 rounded-lg bg-gray-300 px-2 py-1",
        className
      )}
    >
      <ChallengeSummaryScore
        achievements={achievements}
        challenge={challenge}
      />
      <div className="row-start-1 row-span-2 col-start-2 col-span-4 flex flex-col gap-1 items-stretch">
        <h3 className="font-bold text-sm overflow-hidden text-ellipsis">
          {challenge.name}
        </h3>
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
      <div className="row-start-1 row-span-2 col-start-6 col-span-1 flex items-center justify-center uppercase text-xs gap-1">
        <FontAwesomeIcon icon="refresh" />
        {challenge.period}
      </div>
    </div>
  );
}
