import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';
import Calendar from '../Calendar';
import Section from '../Section';
import ObjectUtils from '../../utils/Object';
import ExerciseUtils from '../../utils/Exercise';
import { DayMarker, DayMarkerType } from '../../types/Calendar';
import { ExerciseDayTypeColorMap } from '../../types/Exercise';
import WorkoutOfDayList from '../WorkoutOfDayList';
import { format } from 'date-fns';

type Props = {
    workoutsByDate: Record<string, ExerciseSetRecord[]>;
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
};

export default function WorkoutDayTypeWidget({ onSelectDate, selectedDate, workoutsByDate }: Props) {
    const workoutDayTypeByDates = ObjectUtils.mapValues(workoutsByDate, ExerciseUtils.computeExerciseDayType);
    const calendarMarkers: Record<string, DayMarker> = ObjectUtils.mapValues(workoutDayTypeByDates, (type) => ({
        type: DayMarkerType.Highlight,
        color: ExerciseDayTypeColorMap[type]
    }));
    const workoutOnSelectedDate = workoutsByDate[format(selectedDate, 'dd/MM/yyy')] ?? [];
    return (
        <Section label="Workout day type">
            <Calendar
                markers={calendarMarkers}
                date={selectedDate}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
            />
            <div className="flex flex-wrap gap-2 justify-around py-2">
                {Object.entries(ExerciseDayTypeColorMap).map(([dayType, color]) => (
                    <div className="flex flex-nowrap gap-2" key={dayType}>
                        <div className="rounded-full w-4 h-4" style={{ backgroundColor: color }} />
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