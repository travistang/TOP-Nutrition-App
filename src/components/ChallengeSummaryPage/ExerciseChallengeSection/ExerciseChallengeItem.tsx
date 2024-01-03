import classNames from "classnames";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import ExerciseDatabase from "../../../database/ExerciseDatabase";
import { getAchievedValueFromSet } from "../../../domain/Challenges/exerciseChallenge";
import useFetch from "../../../hooks/useFetch";
import {
  CHALLENGE_TYPE_CONFIG,
  ExerciseChallenge,
} from "../../../types/ExerciseChallenge";
import { MarcoNutritionColor } from "../../../types/Nutrition";
import NumberUtils from "../../../utils/Number";
import Chip from "../../Chip";
import ItemPlaceholder, {
  ItemPlaceholderType,
} from "../../Placeholders/ItemPlaceholder";

const getWorkoutSetsForChallenge = (challenge: ExerciseChallenge) => {
  return ExerciseDatabase.getWorkoutsForChallenge(challenge, Date.now());
};

const getChallengeStatusData = (
  challenge: ExerciseChallenge,
  achievedValue: number
) => {
  const remainingValue = Math.max(0, challenge.target - achievedValue);
  return {
    labels: ["achieved", "remaining"],
    datasets: [
      {
        label: "achieved value",
        borderColor: "transparent",
        data: [achievedValue, remainingValue],
        backgroundColor: [MarcoNutritionColor.carbohydrates, "#aaa"],
      },
    ],
  };
};
const chartOptions = {
  animation: { duration: 1000 },
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
};
type Props = {
  challenge: ExerciseChallenge;
  className?: string;
  onClick?: () => void;
};
export default function ExerciseChallengeItem({
  challenge,
  onClick,
  className,
}: Props) {
  const { result: relatedSets, loading } = useFetch(
    challenge,
    getWorkoutSetsForChallenge
  );
  const totalCompletedValue = useMemo(
    () =>
      NumberUtils.sum(
        ...(relatedSets?.map((set) =>
          getAchievedValueFromSet(set, challenge)
        ) ?? [0])
      ),
    [relatedSets, challenge]
  );

  if (loading) {
    return (
      <ItemPlaceholder
        type={ItemPlaceholderType.IconWithTwoLines}
        className={className}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        "grid grid-rows-2 grid-cols-6 gap-2 py-2",
        className
      )}
    >
      <div className="row-span-2 row-start-1 col-span-1 flex items-center justify-center">
        <Doughnut
          options={chartOptions}
          data={getChallengeStatusData(challenge, totalCompletedValue)}
        />
      </div>
      <div className="row-start-1 col-start-2 col-span-4 text-xs font-bold">
        {challenge.name}
      </div>
      <div className="row-start-2 col-start-2 col-span-4 text-xs font-bold">
        <Chip
          className="w-min px-2 font-bold text-xs"
          color={MarcoNutritionColor.protein}
          text={challenge.interval.toString()}
        />
      </div>
      <div className="row-start-1 row-span-full flex flex-col items-end justify-center text-xs line-clamp-2 overflow-hidden text-ellipsis text-right gap-1">
        <div className="text-lg font-bold leading-3">
          {totalCompletedValue} / {challenge.target}
        </div>
        {CHALLENGE_TYPE_CONFIG[challenge.type].unit}
      </div>
    </div>
  );
}
