import React, { useState } from "react";
import ExerciseDatabase from "../../database/ExerciseDatabase";
import Calendar from "../Calendar";
import Section from "../Section";
import ObjectUtils from "../../utils/Object";
import ExerciseUtils from "../../utils/Exercise";
import { DayMarker, DayMarkerType } from "../../types/Calendar";
import { ExerciseDayTypeColorMap } from "../../types/Exercise";
import WorkoutOfDayList from "../WorkoutOfDayList";
import { format, isSameMonth, startOfMonth } from "date-fns";
import DateInput, { DateInputType } from "../Input/DateInput";
import { useLiveQuery } from "dexie-react-hooks";

export default function WorkoutDayTypeWidget() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const workoutOfMonth = useLiveQuery(() => {
    return ExerciseDatabase.exercisesOfMonth(selectedMonth.getTime());
  }, [selectedMonth]);

  const workoutsByDate = ExerciseUtils.groupWorkoutsByDate(
    workoutOfMonth ?? []
  );

  const workoutDayTypeByDates = ObjectUtils.mapValues(
    workoutsByDate,
    ExerciseUtils.computeExerciseDayType
  );
  const calendarMarkers: Record<string, DayMarker> = ObjectUtils.mapValues(
    workoutDayTypeByDates,
    (type) => ({
      type: DayMarkerType.Highlight,
      color: ExerciseDayTypeColorMap[type],
    })
  );
  const workoutOnSelectedDate =
    workoutsByDate[format(selectedDate, "dd/MM/yyy")] ?? [];
  const onSelectMonth = (newMonth: Date) => {
    setSelectedMonth(newMonth);
    const autoSelectedDate = isSameMonth(newMonth, Date.now())
      ? new Date()
      : startOfMonth(newMonth);
    setSelectedDate(autoSelectedDate);
  };

  return (
    <Section label="Workout day type">
      <DateInput
        dateType={DateInputType.Month}
        label=""
        value={selectedMonth}
        onChange={onSelectMonth}
        inputClassName="bg-gray-400"
        className="mb-2"
      />
      <Calendar
        markers={calendarMarkers}
        date={selectedDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <div className="flex flex-wrap gap-2 justify-around py-2">
        {Object.entries(ExerciseDayTypeColorMap).map(([dayType, color]) => (
          <div className="flex flex-nowrap gap-2" key={dayType}>
            <div
              className="rounded-full w-4 h-4"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs capitalize">{dayType}</span>
          </div>
        ))}
      </div>
      <div className="py-2">
        <WorkoutOfDayList workouts={workoutOnSelectedDate} />
      </div>
    </Section>
  );
}
