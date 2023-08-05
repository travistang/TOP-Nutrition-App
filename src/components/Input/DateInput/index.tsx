import classNames from "classnames";
import { format, getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { useState } from "react";

import { createPortal } from "react-dom";
import InputBase from "../InputBase";
import { TextInputProps } from "../TextInput";
import DateTimePicker from "./DateTimePicker";
import { DateInputType } from "./types";

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
  [DateInputType.Date]: "dd/MM/yyyy",
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
  const [showingPicker, setShowingPicker] = useState(false);

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
  };

  return (
    <>
      <InputBase
        {...inputProps}
        onClick={() => setShowingPicker(true)}
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
      </InputBase>
      {showingPicker &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-8 py-[20vh]">
            <div
              onClick={() => setShowingPicker(false)}
              className="fixed inset-0 z-10 bg-gray-700 bg-opacity-80"
            />
            <div className="bg-gray-300 rounded-lg flex p-2 z-20">
              <DateTimePicker
                withNowButton
                mode={dateType}
                value={new Date(value)}
                onSelectDate={onSelectDate}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
