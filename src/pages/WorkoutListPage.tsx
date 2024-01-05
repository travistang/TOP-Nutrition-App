import { endOfDay, startOfDay } from "date-fns";
import { useMemo } from "react";
import Section from "../components/Section";
import WorkoutOfDayList from "../components/WorkoutOfDayList";
import CardioEntry from "../components/WorkoutOfDayList/CardioEntry";
import WorkoutSummary from "../components/WorkoutSummary";
import ExerciseDatabase from "../database/ExerciseDatabase";
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
  const { result: workoutsToday } = useFetch(null, fetchWorkoutData);
  const { strength: strengthExercises = [], cardio: cardioExercises = [] } =
    workoutsToday ?? {};
  const workoutOfDayData = useMemo(
    () => ({
      strength: strengthExercises,
      cardio: [],
    }),
    [strengthExercises]
  );
  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <div className="p-2 gap-2 pb-36 flex flex-col items-stretch">
        {cardioExercises.length > 0 && (
          <Section label="Cardio exercises">
            {cardioExercises.map((cardio) => (
              <CardioEntry cardio={cardio} key={cardio.id} />
            ))}
          </Section>
        )}
        <WorkoutSummary workouts={strengthExercises} />
        <WorkoutOfDayList workouts={workoutOfDayData} />
      </div>
    </div>
  );
}
