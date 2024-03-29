import { endOfMonth, format, startOfMonth } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";

import { useCallback } from "react";
import ExerciseDatabase, {
  CardioExerciseRecord,
  ExerciseSetRecord,
} from "../../database/ExerciseDatabase";
import { DayMarker, DayMarkerType } from "../../types/Calendar";
import { ExerciseDayTypeColorMap } from "../../types/Exercise";
import ExerciseUtils from "../../utils/Exercise";
import ObjectUtils from "../../utils/Object";

type Props = {
  selectedMonth: Date;
};

type UseWorkoutCalendarDataResponse = {
  calendarMarkers: Record<string, DayMarker>;
  getWorkoutsOnDate: (date: Date) => {
    cardio: CardioExerciseRecord[];
    strength: ExerciseSetRecord[];
  };
};
export default function useWorkoutCalendarData({
  selectedMonth,
}: Props): UseWorkoutCalendarDataResponse {
  const [workoutOfMonth, cardiosOfMonth] = useLiveQuery(() => {
    const monthStart = startOfMonth(selectedMonth).getTime();
    const monthEnd = endOfMonth(selectedMonth).getTime();
    return ExerciseDatabase.transaction(
      "r",
      [
        ExerciseDatabase.exerciseSetRecord,
        ExerciseDatabase.cardioExerciseRecord,
      ],
      (transaction) => {
        return Promise.all([
          ExerciseDatabase.exercisesOfMonth(selectedMonth.getTime()),
          ExerciseDatabase.getCardioExerciseRecords([monthStart, monthEnd]),
        ]) as Promise<[ExerciseSetRecord[], CardioExerciseRecord[]]>;
      }
    ).catch(() => {
      return [[], []];
    });
  }, [selectedMonth]) ?? [[], []];
  const workoutsByDate = ExerciseUtils.groupWorkoutsByDate(
    workoutOfMonth ?? []
  );

  const cardioWorkoutsByDate = ExerciseUtils.groupWorkoutsByDate(
    cardiosOfMonth ?? []
  );

  const allWorkoutsByDate = ObjectUtils.mergeByKey(
    workoutsByDate,
    cardioWorkoutsByDate,
    (strength, cardio) => {
      return {
        cardio: cardio ?? [],
        strength: strength ?? [],
      };
    }
  );

  const calendarMarkers: Record<string, DayMarker> = ObjectUtils.mapValues(
    allWorkoutsByDate,
    (workoutsOnDate) => {
      const hasStrengthTraining = !!workoutsOnDate.strength?.length;
      const hasCardioTraining = !!workoutsOnDate.cardio?.length;
      if (!hasStrengthTraining) {
        return {
          type: DayMarkerType.Dot,
          color: "black",
        };
      }
      const strengthTrainingType = ExerciseUtils.computeExerciseDayType(
        workoutsOnDate.strength
      );
      const highlightColor = ExerciseDayTypeColorMap[strengthTrainingType];

      if (!hasCardioTraining) {
        return {
          type: DayMarkerType.Highlight,
          color: highlightColor,
        };
      }
      return {
        type: DayMarkerType.HighlightAndDot,
        dotColor: "black",
        highlightColor: highlightColor,
      };
    }
  );

  const getWorkoutsOnDate = useCallback(
    (date: Date) => {
      return allWorkoutsByDate[format(date, "yyyy/MM/dd")] ?? [];
    },
    [allWorkoutsByDate]
  );

  return {
    getWorkoutsOnDate,
    calendarMarkers,
  };
}
