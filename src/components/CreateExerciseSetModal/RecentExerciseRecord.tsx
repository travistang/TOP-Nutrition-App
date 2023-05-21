import React from "react";
import { format } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import ArrayUtils from "../../utils/Array";
import ObjectUtils from "../../utils/Object";
import PreviousWorkoutList from "./PreviousWorkoutList";
import RecentExerciseStatistics from "./RecentExerciseStatistics";
import RecentExerciseStatisticsChart from "./RecentExerciseStatisticsChart";
import { WorkoutTrendMode } from "../../types/Exercise";
import classNames from "classnames";

type Props = {
  inline?: boolean;
  className?: string;
  exerciseName: string;
};
export default function RecentExerciseRecord({
  inline,
  className,
  exerciseName,
}: Props) {
  const exerciseRecords = useLiveQuery(() => {
    return ExerciseDatabase.getRecentExercisesTrendData(exerciseName);
  }, [exerciseName]);

  const recordsByDate = ArrayUtils.groupBy(exerciseRecords ?? [], (record) =>
    format(record.date, "yyyy/MM/dd")
  );
  const sortedWorkoutGroups = ObjectUtils.valueBySortedKey(
    recordsByDate,
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div
      className={classNames(
        !inline && "flex flex-col gap-2 overflow-y-auto pb-12",
        inline && "contents",
        className
      )}
    >
      <RecentExerciseStatistics
        noHeader={inline}
        recentExercises={exerciseRecords ?? []}
      />
      <RecentExerciseStatisticsChart
        trendMode={WorkoutTrendMode.MaxWeight}
        workouts={exerciseRecords ?? []}
      />
      <RecentExerciseStatisticsChart
        trendMode={WorkoutTrendMode.TotalVolume}
        workouts={exerciseRecords ?? []}
      />
      <div className="flex flex-1 flex-col min-h-[30vh] overflow-y-auto items-stretch snap-y snap-proximity">
        {sortedWorkoutGroups.map((records) => (
          <PreviousWorkoutList key={records[0].id} workouts={records} />
        ))}
      </div>
    </div>
  );
}
