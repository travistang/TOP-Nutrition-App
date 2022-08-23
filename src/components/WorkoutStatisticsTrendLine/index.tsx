import React, { useContext } from "react";
import { format, parse } from "date-fns";
import { Line } from "react-chartjs-2";
import DateUtils from '../../utils/Date';
import ObjectUtils from '../../utils/Object';
import { workoutByDateContext } from "../WorkoutChartBase/WorkoutByDateContext";
import { ExerciseSetRecord } from "../../database/ExerciseDatabase";

const chartOptions = {
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
};

type Props = {
    label: string;
    extractDataPredicate: (workouts: ExerciseSetRecord[]) => number;
};
export default function WorkoutStatisticsTrendLine({ label, extractDataPredicate }: Props) {
    const workoutsByDate = useContext(workoutByDateContext);

    const dataByDate = ObjectUtils.mapValues(
        workoutsByDate, extractDataPredicate,
    );

    const dataByDateWithoutZero = ObjectUtils.filterValues(dataByDate, (value) => value > 0);
    if (Object.keys(dataByDateWithoutZero).length === 0) {
        return (
            <span className="text-sm self-center h-12">No records can be shown </span>
        );
    }

    const firstDayOfData = Object.keys(dataByDateWithoutZero)[0];
    const allDaysInMonth = DateUtils.eachDaysOfMonth(parse(firstDayOfData, 'dd/MM/yyyy', new Date()));
    const data = {
        labels: allDaysInMonth.map(date => format(date, 'dd/MM')),
        datasets: [
            {
                label,
                data: allDaysInMonth.map(date => {
                    const dateKey = format(date, 'dd/MM/yyyy');
                    return dataByDateWithoutZero[dateKey];
                }),
                borderColor: 'rgb(198, 95, 84)',
                backgroundColor: 'rgb(198, 95, 84)'
            }
        ]
    };

    return (
        <Line options={chartOptions} data={data} />
    );
}