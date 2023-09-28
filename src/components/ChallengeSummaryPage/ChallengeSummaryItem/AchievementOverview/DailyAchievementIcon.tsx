import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Achievement } from "../../../../types/Achievement";

type Props = {
  className?: string;
  achievements: Achievement[];
  reversed?: boolean;
};

type DailyAchievementState = "success" | "failed" | "neutral";
const getDailyAchievementState = (
  hasAchievements: boolean,
  reversed: boolean
): DailyAchievementState => {
  if (reversed) {
    return hasAchievements ? "failed" : "success";
  }

  return hasAchievements ? "success" : "neutral";
};

export default function DailyAchievementIcon({
  className,
  achievements,
  reversed,
}: Props) {
  const state = getDailyAchievementState(achievements.length > 0, !!reversed);
  if (state === "neutral") {
    return (
      <div
        className={classNames(
          "rounded-full flex-shrink-0 h-8 w-8 bg-gray-400",
          className
        )}
      />
    );
  }
  return (
    <div
      className={classNames(
        "rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center text-white",
        state === "success" ? "bg-carbohydrates" : "bg-fat",
        className
      )}
    >
      <FontAwesomeIcon
        icon={state === "success" ? "check" : "times"}
        className="h-6 w-6"
      />
    </div>
  );
}
