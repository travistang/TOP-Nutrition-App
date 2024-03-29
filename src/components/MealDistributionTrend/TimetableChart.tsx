import React from 'react';
import classNames from 'classnames';
import { eachDayOfInterval, format } from 'date-fns';
import DateUtils from '../../utils/Date';
import ObjectUtils from '../../utils/Object';
import { groupDataWithinDay } from './utils';
import DayRow from './DayRow';
import DateAxis from './DateAxis';
import TimeAxis from './TimeAxis';

type Props<T> = {
  startDate: Date | number;
  endDate: Date | number;
  className?: string;
  data: T[];
}
export default function TimetableChart<T extends { date: Date | number; }>({ startDate, endDate, className, data }: Props<T>) {
  const daysInInterval = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const dataByDay = DateUtils.groupRecordsByDates(data, daysInInterval);
  const grouppedDataByDay = ObjectUtils.mapValues(
    dataByDay,
    dataOfDay => groupDataWithinDay(dataOfDay, 60)
  );
  return (
    <div className="flex flex-row flex-wrap">
      <TimeAxis intervalInMinute={60} />
      <div className={classNames("flex flex-row flex-nowrap flex-1 col-span-full h-36", className)}>
        {daysInInterval.map((day) =>
          <DayRow
            intervalCount={24}
            data={grouppedDataByDay[format(day, "yyyy/MM/dd")]}
          />)
        }
      </div>
      <DateAxis daysInInterval={daysInInterval} />
    </div>
  )
}