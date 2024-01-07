import classNames from "classnames";
import { format } from "date-fns";
import { useMemo } from "react";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import { EventBusName } from "../../domain/EventBus";
import useEventBus from "../../hooks/useEventBus";
import useFetch from "../../hooks/useFetch";
import { WorkoutTrendMode } from "../../types/Exercise";
import ArrayUtils from "../../utils/Array";
import ObjectUtils from "../../utils/Object";
import EmptyNotice from "../EmptyNotice";
import ExerciseRelatedChallengesSection from "./ExerciseRelatedChallengesSection";
import PreviousWorkoutList from "./PreviousWorkoutList";
import RecentExerciseStatistics from "./RecentExerciseStatistics";
import RecentExerciseStatisticsChart from "./RecentExerciseStatisticsChart";
import WorkoutFilter from "./WorkoutFilter";
import useWorkoutFilter from "./WorkoutFilter/useWorkoutFilter";

const queryByExerciseName = (name: string) =>
  ExerciseDatabase.getRecentExercisesTrendData(name);

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
  const { result: exerciseRecords, refetch } = useFetch(
    exerciseName,
    queryByExerciseName
  );
  useEventBus(EventBusName.Workouts, refetch);

  const { availableFilters, appliedFilter, toggleFilter, filteredRecords } =
    useWorkoutFilter(exerciseRecords ?? []);

  const recordsByDate = useMemo(
    () =>
      ArrayUtils.groupBy(filteredRecords ?? [], (record) =>
        format(record.date, "yyyy/MM/dd")
      ),
    [filteredRecords]
  );

  const sortedWorkoutGroups = useMemo(
    () =>
      ObjectUtils.valueBySortedKey(
        recordsByDate,
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      ),
    [recordsByDate]
  );

  const hasFilterWithNoResults = filteredRecords.length === 0;

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
      <ExerciseRelatedChallengesSection records={filteredRecords} />
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
