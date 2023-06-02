import React, { useState } from "react";
import { isSameMonth, startOfMonth } from "date-fns";
import Calendar from "../Calendar";
import Section from "../Section";
import { ExerciseDayTypeColorMap } from "../../types/Exercise";
import WorkoutOfDayList from "../WorkoutOfDayList";
import DateInput, { DateInputType } from "../Input/DateInput";
import useWorkoutCalendarData from "./useWorkoutCalendarData";

export default function WorkoutDayTypeWidget() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getWorkoutsOnDate, calendarMarkers } = useWorkoutCalendarData({
    selectedMonth,
  });

  const workoutOnSelectedDate = getWorkoutsOnDate(selectedDate);

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
      <div className="py-2 max-h-24 overflow-y-auto">
        <WorkoutOfDayList workouts={workoutOnSelectedDate} />
      </div>
    </Section>
  );
}
