import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import { format, startOfMonth, isSameMonth, parse } from "date-fns";
import TextInput from "../components/Input/TextInput";
import ExerciseDatabase from "../database/ExerciseDatabase";
import ExerciseUtils from '../utils/Exercise';
import WorkoutDayTypeWidget from "../components/WorkoutDayTypeWidget";
import WorkoutTrendLineChart from "../components/WorkoutTrendLineChart";

export default function WorkoutStatistics() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const workoutOfMonth = useLiveQuery(() => {
        return ExerciseDatabase.exercisesOfMonth(selectedMonth.getTime());
    }, [selectedMonth]);

    const workoutsByDate = ExerciseUtils.groupWorkoutsByDate(workoutOfMonth ?? []);
    const onSelectMonth = (newMonthString: string) => {
        const newMonth = parse(newMonthString, "yyyy-MM", Date.now());
        setSelectedMonth(newMonth);
        const autoSelectedDate = isSameMonth(newMonth, Date.now()) ? new Date() : startOfMonth(newMonth);
        setSelectedDate(autoSelectedDate);
    };

    return (
        <div className="flex flex-col items-stretch gap-2 overflow-y-auto pb-24">
            <StatisticsNavigateTab />
            <TextInput
                label=""
                type="month"
                value={format(selectedMonth, "yyyy-MM")}
                onChange={onSelectMonth}
            />
            <WorkoutDayTypeWidget
                workoutsByDate={workoutsByDate}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />
            <WorkoutTrendLineChart
                workoutsByDate={workoutsByDate}
            />
        </div>
    );
}