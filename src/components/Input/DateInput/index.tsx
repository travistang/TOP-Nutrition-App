import classNames from "classnames";
import { format, getHours, getMinutes } from "date-fns";
import OutsideClickHandler from "react-outside-click-handler";
import { setHours, setMinutes } from "date-fns/esm";
import React, { useState } from "react";
import InputBase from "../InputBase";
import { TextInputProps } from "../TextInput";
import DateTimePicker from "./DateTimePicker";

export enum DateInputType {
  DateTime,
  Month,
}

type Props = Omit<
  TextInputProps,
  "children" | "type" | "value" | "onChange"
> & {
  value: Date | number;
  onChange: (value: Date) => void;
  dateType: DateInputType;
};

const DateInputTypeFormatMapping: Record<DateInputType, string> = {
  [DateInputType.DateTime]: "dd/MM/yyyy HH:mm",
  [DateInputType.Month]: "yyyy-MM",
};

export default function DateInput({
  value,
  onChange,
  dateType,
  className,
  inputClassName,
  ...inputProps
}: Props) {
  const dateFormat = DateInputTypeFormatMapping[dateType];
  const [showingDate, setShowingDate] = useState<Date | null>(null);

  const onSelectDate = (date: Date, keepTime = false) => {
    if (keepTime) {
      const changingDate = setMinutes(
        setHours(date, getHours(value)),
        getMinutes(value)
      );
      onChange(changingDate);
    } else {
      onChange(date);
    }

    setShowingDate(null);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => setShowingDate(null)}
      display="contents"
    >
      <InputBase
        {...inputProps}
        onClick={() => setShowingDate(showingDate ? null : new Date())}
        className={classNames("relative", className)}
      >
        <div
          className={classNames(
            "rounded-lg h-12 px-2 flex items-center overflow-hidden",
            inputClassName ?? "bg-gray-400"
          )}
        >
          {format(value, dateFormat)}
        </div>
        {showingDate && (
          <DateTimePicker
            mode={dateType}
            value={new Date(value)}
            onSelectDate={onSelectDate}
          />
        )}
      </InputBase>
    </OutsideClickHandler>
  );
}
