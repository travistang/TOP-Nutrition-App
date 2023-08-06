import { isSameMonth, startOfMonth } from "date-fns";
import { useState } from "react";
import { ExerciseDayTypeColorMap } from "../../types/Exercise";
import Calendar from "../Calendar";
import DateInput from "../Input/DateInput";
import { DateInputType } from "../Input/DateInput/types";
import Legend, { LegendType } from "../Legend";
import Section from "../Section";
import WorkoutOfDayList from "../WorkoutOfDayList";
import useWorkoutCalendarData from "./useWorkoutCalendarData";

const LEGENDS: { label: string; legendType: LegendType; color: string }[] = [
  ...Object.entries(ExerciseDayTypeColorMap).map(([dayType, color]) => ({
    label: dayType,
    color,
    legendType: LegendType.Circle,
  })),
  {
    label: "Cardio",
    color: "black",
    legendType: LegendType.Dot,
  },
];
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
      <div className="flex flex-wrap gap-2 justify-evenly py-2">
        {LEGENDS.map(({ label, color, legendType }) => (
          <Legend
            key={label}
            label={label}
            color={color}
            legendType={legendType}
          />
        ))}
      </div>
      <div className="py-2 max-h-24 overflow-y-auto">
        <WorkoutOfDayList workouts={workoutOnSelectedDate} />
      </div>
    </Section>
  );
}
