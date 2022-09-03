import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addYears, format } from "date-fns";
import React from "react";

type Props = {
  value: Date;
  onChange: (d: Date) => void;
};
export default function YearPicker({ value, onChange }: Props) {
  const changeYear = (offset: number) => () => {
    onChange(addYears(value, offset));
  };
  return (
    <div className="py-1 flex flex-nowrap justify-between items-center">
      <FontAwesomeIcon
        onClick={changeYear(-1)}
        icon="caret-left"
        className="w-4 h-4"
      />
      <span>{format(value, "yyyy")}</span>
      <FontAwesomeIcon
        onClick={changeYear(1)}
        icon="caret-right"
        className="w-4 h-4"
      />
    </div>
  );
}
