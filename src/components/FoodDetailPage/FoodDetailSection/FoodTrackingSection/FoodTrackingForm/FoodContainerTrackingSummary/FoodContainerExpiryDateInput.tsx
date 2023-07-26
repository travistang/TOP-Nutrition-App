import React from "react";
import CheckboxInput from "../../../../../Input/CheckboxInput";
import DateInput from "../../../../../Input/DateInput";
import { DateInputType } from "../../../../../Input/DateInput/types";

type Props = {
  expiryDate?: number;
  onChange: (expiryDate?: number) => void;
};

export default function FoodContainerExpiryDateInput({
  onChange,
  expiryDate,
}: Props) {
  const onToggleExpiryDate = () => {
    const willHaveExpiryDate = !expiryDate;
    if (willHaveExpiryDate) {
      onChange(Date.now());
    } else {
      onChange(undefined);
    }
  };

  return (
    <>
      <CheckboxInput
        label="Expiry date"
        className="col-start-1 row-start-3 col-span-2 h-14"
        selected={!!expiryDate}
        onCheck={onToggleExpiryDate}
      />
      {expiryDate && (
        <DateInput
          onChange={(date) => onChange(date.getTime())}
          dateType={DateInputType.Date}
          value={expiryDate}
          className="row-start-3 col-start-3 col-span-4"
        />
      )}
    </>
  );
}
