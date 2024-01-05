import classNames from "classnames";
import {
  getAchievementProgressScore,
  getUnitPlural,
} from "../../../domain/Challenges";
import { Achievement, Challenge } from "../../../types/Achievement";
import ChallengeModeChip from "./ChallengeModeChip";

type Props = {
  challenge: Challenge;
  achievements: Achievement[];
  className?: string;
};
export default function ChallengeSummaryScore({
  challenge,
  achievements,
  className,
}: Props) {
  const score = getAchievementProgressScore(challenge, achievements);
  return (
    <div className={classNames("flex items-center gap-1", className)}>
      <ChallengeModeChip mode={challenge.mode} />
      <span className="text-3xl font-bold">{score}</span>
      <span className="text-xs pt-2">
        /{challenge.target} {getUnitPlural(challenge.unit)}
      </span>
    </div>
  );
}
