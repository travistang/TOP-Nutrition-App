import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import {
  Achievement,
  Challenge,
  ChallengeMode,
} from "../../../../types/Achievement";
import DateUtils from "../../../../utils/Date";
import DailyAchievementIcon from "./DailyAchievementIcon";

type Props = {
  challenge: Challenge;
  achievements: Achievement[];
};
const weekEnd = endOfWeek(Date.now());
const weekStart = startOfWeek(Date.now());
const dayInWeeks = eachDayOfInterval({ start: weekStart, end: weekEnd });
const sortedDayStringInWeeks = dayInWeeks.map(DateUtils.dateToStringKey);

export default function WeeklyAchievementOverview({
  challenge,
  achievements,
}: Props) {
  const achievementsByWeek = DateUtils.groupRecordsByDates(
    achievements,
    dayInWeeks
  );
  return (
    <div className="grid grid-cols-7 gap-2 items-center">
      {sortedDayStringInWeeks.map((dayString, i) => (
        <DailyAchievementIcon
          key={dayString}
          date={dayInWeeks[i]}
          achievements={achievementsByWeek[dayString]}
          reversed={challenge.mode === ChallengeMode.LessThanTarget}
        />
      ))}
    </div>
  );
}
