import classNames from "classnames";
import {
  Achievement,
  Challenge,
  ChallengePeriod,
} from "../../../types/Achievement";
import DailyAchievementOverview from "./AchievementOverview/DailyAchievementOverview";
import ChallengeSummaryScore from "./ChallengeSummaryScore";

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
      <h3 className="font-bold text-sm col-end-6 col-start-2 overflow-hidden text-ellipsis">
        {challenge.name}
      </h3>
      <div className="col-end-6 col-start-2 row-start-2">
        {challenge.period === ChallengePeriod.Daily && (
          <DailyAchievementOverview
            challenge={challenge}
            achievements={achievements}
          />
        )}
      </div>
    </div>
  );
}
