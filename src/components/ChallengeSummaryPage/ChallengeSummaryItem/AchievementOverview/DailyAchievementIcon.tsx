import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Achievement } from "../../../../types/Achievement";
import { isFuture, startOfDay } from "date-fns";

type Props = {
  className?: string;
  achievements: Achievement[];
  reversed?: boolean;
  date: number;
};

type DailyAchievementState = "success" | "failed" | "neutral";
const getDailyAchievementState = (
  hasAchievements: boolean,
  reversed: boolean,
  isFuture: boolean
  ): DailyAchievementState => {
  if (isFuture) {
    return "neutral";
  }
  if (reversed) {
    return hasAchievements ? "failed" : "success";
  }

  return hasAchievements ? "success" : "neutral";
};

export default function DailyAchievementIcon({
  className,
  achievements,
  reversed,
  date,
}: Props) {
  const state = getDailyAchievementState(
    achievements.length > 0,
    !!reversed,
    isFuture(startOfDay(date))
  );
  if (state === "neutral") {
    return (
      <div
        className={classNames(
          "rounded-full flex-shrink-0 h-6 w-6 bg-gray-400",
          className
        )}
      />
    );
  }
  return (
    <div
      className={classNames(
        "rounded-full flex-shrink-0 h-6 w-6 flex items-center justify-center text-white",
        state === "success" ? "bg-carbohydrates" : "bg-fat",
        className
      )}
    >
      <FontAwesomeIcon
        icon={state === "success" ? "check" : "times"}
        className="h-4 w-4 child:fill-gray-300"
      />
    </div>
  );
}
