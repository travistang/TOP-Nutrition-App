import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { DateInputType } from "../Input/DateInput";
import DateTimePicker from "../Input/DateInput/DateTimePicker";
import TabSelectInput, { Option } from "../Input/TabSelectInput";

const TimeInputOptions: Option<boolean>[] = [
  {
    icon: "clock",
    text: "Now",
    value: true,
  },
  {
    icon: "calendar",
    text: "Other time...",
    value: false,
  },
];

type Props = {
  setDate: (date: Date) => void;
  date: Date;
  children?: React.ReactNode;
  className?: string;
  useCurrentTimeByDefault?: boolean;
};
export default function TimeForm({
  setDate,
  date,
  children,
  className,
  useCurrentTimeByDefault = true
}: Props) {
  const [useCurrentTime, setUseCurrentTime] = useState(useCurrentTimeByDefault);

  useEffect(() => {
    if (useCurrentTime) {
      setDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCurrentTime]);

  return (
    <div className={classNames("flex flex-col items-stretch", className)}>
      <span className="text-xs">Exercise time</span>
      <TabSelectInput
        options={TimeInputOptions}
        selected={useCurrentTime}
        onSelect={setUseCurrentTime}
      />
      {!useCurrentTime && (
        <div className="px-12">
          <DateTimePicker
            calendarClassName="gap-y-1"
            inline
            value={date}
            onSelectDate={setDate}
            mode={DateInputType.DateTime}
          />
        </div>
      )}
      {children}
    </div>
  );
}
