import React from "react";
import { format } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import ArrayUtils from "../../utils/Array";
import ObjectUtils from "../../utils/Object";
import PreviousWorkoutList from "./PreviousWorkoutList";
import RecentExerciseStatistics from "./RecentExerciseStatistics";
import StringUtils from '../../utils/String';

type Props = {
  exerciseName: string;
};
export default function RecentExerciseRecord({ exerciseName }: Props) {
  const exerciseRecords = useLiveQuery(() => {
    return ExerciseDatabase.exerciseSetRecord
      .filter((record) => {
        return StringUtils.caseInsensitiveEqual(record.exercise.name, exerciseName);
      })
      .reverse()
      .limit(25)
      .sortBy("date");
  });

  const recordsByDate = ArrayUtils.groupBy(exerciseRecords ?? [], (record) =>
    format(record.date, "yyyy/MM/dd")
  );
  const sortedWorkoutGroups = ObjectUtils.valueBySortedKey(
    recordsByDate,
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className= "flex flex-col max-h-[1/2vh] overflow-y-auto pb-12">
      <RecentExerciseStatistics recentExercises={exerciseRecords ?? []} />
      <div className="flex flex-1 flex-col overflow-y-auto items-stretch snap-y snap-proximity">
        {sortedWorkoutGroups.map((records) => (
          <PreviousWorkoutList key={records[0].id} workouts={records} />
        ))}
      </div>
    </div>
  );
}
