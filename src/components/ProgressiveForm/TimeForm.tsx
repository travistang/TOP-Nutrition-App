import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { DateInputType } from "../Input/DateInput/types";
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
  title: string;
  children?: React.ReactNode;
  className?: string;
  useCurrentTimeByDefault?: boolean;
};
export default function TimeForm({
  setDate,
  date,
  title,
  children,
  className,
  useCurrentTimeByDefault = true,
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
      <span className="text-xs">{title}</span>
      <TabSelectInput
        options={TimeInputOptions}
        selected={useCurrentTime}
        onSelect={setUseCurrentTime}
      />
      {!useCurrentTime && (
        <div className="px-12 pb-2">
          <DateTimePicker
            calendarClassName="gap-y-1"
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
