import { format, isSameMonth, parse, startOfMonth } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import Calendar from "../components/Calendar";
import ExerciseSetOverview from "../components/ExerciseSetOverview";
import TextInput from "../components/Input/TextInput";
import ExerciseDatabase from "../database/ExerciseDatabase";
import ExerciseUtils from "../utils/Exercise";

export default function WorkoutListPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const exercisesOfDay = useLiveQuery(() => {
    return ExerciseDatabase.exercisesOfDay(selectedDate.getTime());
  }, [selectedDate]);

  const workoutsByExercises = ExerciseUtils.groupWorkouts(exercisesOfDay ?? []);
  console.log({ workoutsByExercises });

  const changeMonth = (newMonth: Date) => {
    setSelectedMonth(newMonth);
    const now = new Date();
    const nextSelectedDate = isSameMonth(newMonth, now)
      ? now
      : startOfMonth(newMonth);
    setSelectedDate(nextSelectedDate);
  };

  return (
    <div className="flex flex-col overflow-y-auto flex-1 gap-2 items-stretch">
      <TextInput
        label=""
        type="month"
        value={format(selectedMonth, "yyyy-MM")}
        onChange={(monthString) =>
          changeMonth(parse(monthString, "yyyy-MM", Date.now()))
        }
      />
      <div className="p-2">
        <Calendar
          date={selectedMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className="bg-gray-200 rounded-lg mb-4 p-4 gap-x-2"
        />
        {workoutsByExercises.length === 0 && (
          <div className="flex items-center justify-center text-xs h-12">
            You didn't do any exercise on this day
          </div>
        )}
        {workoutsByExercises.map((workout) => (
          <ExerciseSetOverview key={workout[0].id} sets={workout} />
        ))}
      </div>
    </div>
  );
}
