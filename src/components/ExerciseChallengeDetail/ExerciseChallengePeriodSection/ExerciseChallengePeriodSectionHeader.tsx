import { format } from "date-fns";
import { useMemo } from "react";
import {
  getAchievedValueFromSet,
  getTimeFromInterval,
} from "../../../domain/Challenges/ExerciseChallenge";
import { ExerciseSet } from "../../../types/Exercise";
import {
  ExerciseChallenge,
  ExerciseChallengeMode,
} from "../../../types/ExerciseChallenge";
import { MarcoNutritionColor } from "../../../types/Nutrition";
import NumberUtils from "../../../utils/Number";
import Chip from "../../Chip";
import ProgressBar from "../../ProgressBar";

const formatDate = (date: number) => format(date, "dd/MM/yyyy");

type Props = {
  date: number;
  challenge: ExerciseChallenge;
  workouts: ExerciseSet[];
};
export default function ExerciseChallengePeriodSectionHeader({
  date,
  challenge,
  workouts,
}: Props) {
  const sectionTitle = useMemo(() => {
    const [start, end] = getTimeFromInterval(challenge.interval, date);
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [challenge.interval, date]);
  const completedValue = useMemo(
    () =>
      Math.min(
        challenge.target,
        NumberUtils.sum(
          ...workouts.map((workout) =>
            getAchievedValueFromSet(workout, challenge)
          )
        )
      ),
    [workouts, challenge]
  );

  const progressBarData = useMemo(() => {
    const reversed = [
      ExerciseChallengeMode.LessThan,
      ExerciseChallengeMode.LessThanOrEqualTo,
    ].includes(challenge.mode);
    const achieved = reversed
      ? completedValue < challenge.target
      : completedValue >= challenge.target;
    const color = achieved
      ? MarcoNutritionColor.carbohydrates
      : MarcoNutritionColor.fat;

    return [
      {
        name: "progress",
        value: completedValue,
        color,
      },
    ];
  }, [completedValue, challenge.mode, challenge.target]);
  return (
    <div className="flex items-center gap-2 flex-nowrap font-bold">
      <Chip
        className="px-1 flex-shrink-0 w-6 overflow-hidden flex justify-center font-bold text-xs"
        text={workouts.length.toString()}
        color="#aaa"
      />
      <ProgressBar
        totalValue={challenge.target}
        data={progressBarData}
        className="w-12 flex-shrink-0 h-2"
      />
      {sectionTitle}
    </div>
  );
}
