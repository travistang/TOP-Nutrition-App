import classNames from "classnames";
import React, { useState } from "react";
import DateTimePicker from "../Input/DateInput/DateTimePicker";
import { DateInputType } from "../Input/DateInput/types";
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
  title?: string;
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

  const onSetToCurrentTime = (willUseCurrentTime: boolean) => {
    if (willUseCurrentTime) {
      setDate(new Date());
    }
    setUseCurrentTime(willUseCurrentTime);
  };

  return (
    <div className={classNames("flex flex-col items-stretch", className)}>
      {title && <span className="text-xs">{title}</span>}
      <TabSelectInput
        options={TimeInputOptions}
        selected={useCurrentTime}
        onSelect={onSetToCurrentTime}
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
