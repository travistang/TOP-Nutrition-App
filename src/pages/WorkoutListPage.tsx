import { endOfDay, startOfDay } from "date-fns";
import { useMemo } from "react";
import Section from "../components/Section";
import WorkoutOfDayList from "../components/WorkoutOfDayList";
import CardioEntry from "../components/WorkoutOfDayList/CardioEntry";
import WorkoutSummary from "../components/WorkoutSummary";
import ExerciseDatabase from "../database/ExerciseDatabase";
import { EventBusName } from "../domain/EventBus";
import useEventBus from "../hooks/useEventBus";
import useFetch from "../hooks/useFetch";

const fetchWorkoutData = async () => {
  const now = Date.now();
  const timeRangeOfDay = [
    startOfDay(now).getTime(),
    endOfDay(now).getTime(),
  ] as [number, number];
  const [strength, cardio] = await Promise.all([
    ExerciseDatabase.exercisesOfDay(now),
    ExerciseDatabase.getCardioExerciseRecords(timeRangeOfDay),
  ]);
  return {
    cardio,
    strength,
  };
};
export default function WorkoutListPage() {
  const { result: workoutsToday, refetch } = useFetch(null, fetchWorkoutData);
  useEventBus(EventBusName.Workouts, refetch);
  const workoutOfDayData = useMemo(
    () => ({
      strength: workoutsToday?.strength ?? [],
      cardio: [],
    }),
    [workoutsToday?.strength]
  );
  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <div className="p-2 gap-2 pb-36 flex flex-col items-stretch">
        {!!workoutsToday?.cardio.length && (
          <Section label="Cardio exercises">
            {workoutsToday?.cardio.map((cardio) => (
              <CardioEntry cardio={cardio} key={cardio.id} />
            ))}
          </Section>
        )}
        <WorkoutSummary workouts={workoutsToday?.strength ?? []} />
        <WorkoutOfDayList workouts={workoutOfDayData} />
      </div>
    </div>
  );
}
