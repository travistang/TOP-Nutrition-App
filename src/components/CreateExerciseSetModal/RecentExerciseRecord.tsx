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
import WorkoutFilter from "./WorkoutFilter";
import useWorkoutFilter from "./WorkoutFilter/useWorkoutFilter";
import EmptyNotice from "../EmptyNotice";

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

  const { availableFilters, appliedFilter, toggleFilter, filteredRecords } =
    useWorkoutFilter(exerciseRecords ?? []);

  const recordsByDate = ArrayUtils.groupBy(filteredRecords ?? [], (record) =>
    format(record.date, "yyyy/MM/dd")
  );
  const sortedWorkoutGroups = ObjectUtils.valueBySortedKey(
    recordsByDate,
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const hasFilterWithNoResults =
    exerciseRecords?.length && filteredRecords.length === 0;

  return (
    <div
      className={classNames(
        !inline && "flex flex-col items-stretch gap-2 overflow-y-auto pb-12",
        inline && "contents",
        className
      )}
    >
      <RecentExerciseStatistics
        noHeader={inline}
        recentExercises={filteredRecords}
      />
      <RecentExerciseStatisticsChart
        trendMode={WorkoutTrendMode.MaxWeight}
        workouts={filteredRecords}
      />
      <RecentExerciseStatisticsChart
        trendMode={WorkoutTrendMode.TotalVolume}
        workouts={filteredRecords}
      />
      <WorkoutFilter
        availableFilters={availableFilters}
        currentFilter={appliedFilter}
        toggleFilter={toggleFilter}
        exercises={filteredRecords}
      />
      {hasFilterWithNoResults && (
        <EmptyNotice icon="filter" message="No results" />
      )}
      <div className="flex flex-1 flex-col min-h-[30vh] overflow-y-auto items-stretch snap-y snap-proximity">
        {sortedWorkoutGroups.map((records) => (
          <PreviousWorkoutList key={records[0].id} workouts={records} />
        ))}
      </div>
    </div>
  );
}
