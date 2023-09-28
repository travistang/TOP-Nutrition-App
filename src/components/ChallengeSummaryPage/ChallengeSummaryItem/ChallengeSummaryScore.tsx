import {
  getAchievementProgressScore,
  getUnitPlural,
} from "../../../domain/Challenges";
import { Achievement, Challenge } from "../../../types/Achievement";

type Props = {
  challenge: Challenge;
  achievements: Achievement[];
};
export default function ChallengeSummaryScore({
  challenge,
  achievements,
}: Props) {
  const score = getAchievementProgressScore(challenge, achievements);
  return (
    <div className="flex items-center gap-1 row-span-2 col-span-1 col-start-1 justify-center">
      <span className="text-3xl font-bold">{score}</span>
      <span className="text-xs pt-2">
        /{challenge.target} {getUnitPlural(challenge.unit)}
      </span>
    </div>
  );
}
