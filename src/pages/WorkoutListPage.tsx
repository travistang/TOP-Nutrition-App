import React from "react";
import WorkoutOfDayList from "../components/WorkoutOfDayList";
import WorkoutSummary from "../components/WorkoutSummary";
import useWorkoutCalendarData from "../components/WorkoutDayTypeWidget/useWorkoutCalendarData";
import CardioEntry from "../components/WorkoutOfDayList/CardioEntry";
import Section from "../components/Section";

export default function WorkoutListPage() {
  const now = new Date();
  const { getWorkoutsOnDate } = useWorkoutCalendarData({ selectedMonth: now });
  const workoutsToday = getWorkoutsOnDate(now);
  const { strength: strengthExercises = [], cardio: cardioExercises = [] } =
    workoutsToday ?? {};

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
        <WorkoutOfDayList
          workouts={{ strength: strengthExercises, cardio: [] }}
        />
      </div>
    </div>
  );
}
