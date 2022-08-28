import { format, parse } from "date-fns";
import React from "react";
import { InputBaseProps } from "./InputBase";
import TextInput from "./TextInput";

export enum DateInputType {
  DateTime,
  Month,
}

type Props = Omit<InputBaseProps, "children" | "type"> & {
  value: Date | number;
  onChange: (value: Date) => void;
  dateType: DateInputType;
};

const DateInputTypeFormatMapping: Record<
  DateInputType,
  { format: string; inputType: string }
> = {
  [DateInputType.DateTime]: {
    format: "yyyy-MM-dd'T'HH:mm",
    inputType: "datetime-local",
  },
  [DateInputType.Month]: { format: "yyyy-MM", inputType: "month" },
};
export default function DateInput({
  value,
  onChange,
  dateType,
  ...inputProps
}: Props) {
  const { format: dateFormat, inputType } =
    DateInputTypeFormatMapping[dateType];

  return (
    <TextInput
      {...inputProps}
      type={inputType}
      value={format(value, dateFormat)}
      onChange={(dateString) =>
        onChange(parse(dateString, dateFormat, new Date()))
      }
    />
  );
}
