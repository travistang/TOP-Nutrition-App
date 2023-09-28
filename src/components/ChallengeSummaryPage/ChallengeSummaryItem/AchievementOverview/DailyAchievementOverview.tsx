import { getTotalAchievedValue } from "../../../../domain/Challenges";
import {
  Achievement,
  Challenge,
  ChallengeMode,
} from "../../../../types/Achievement";
import { MarcoNutritionColor } from "../../../../types/Nutrition";
import ProgressBar from "../../../ProgressBar";

type Props = {
  challenge: Challenge;
  achievements: Achievement[];
};

const getProgressData = (
  currentValue: number,
  targetValue: number,
  reversed: boolean
) => [
  {
    name: "achieved",
    value: currentValue,
    color: reversed
      ? MarcoNutritionColor.fat
      : MarcoNutritionColor.carbohydrates,
  },
  {
    name: "remaining",
    value: Math.max(targetValue - currentValue, 0),
    color: MarcoNutritionColor.carbohydrates,
  },
];
export default function DailyAchievementOverview({
  challenge,
  achievements,
}: Props) {
  const totalAchievedValue = getTotalAchievedValue(achievements);
  const isProgressReversed = challenge.mode === ChallengeMode.LessThanTarget;
  return (
    <ProgressBar
      data={getProgressData(
        totalAchievedValue,
        challenge.target,
        isProgressReversed
      )}
      totalValue={challenge.target}
      className="w-full h-4"
    />
  );
}
