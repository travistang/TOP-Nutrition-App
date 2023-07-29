import classNames from "classnames";
import CheckboxInput from "../../../../../Input/CheckboxInput";
import DateInput from "../../../../../Input/DateInput";
import { DateInputType } from "../../../../../Input/DateInput/types";

type Props = {
  className?: string;
  expiryDate?: number;
  onChange: (expiryDate?: number) => void;
};

export default function FoodContainerExpiryDateInput({
  className,
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
    <div className={classNames("flex items-center", className)}>
      <CheckboxInput
        label={!expiryDate ? "Expiry date" : ""}
        className="col-span-2 h-14"
        selected={!!expiryDate}
        onCheck={onToggleExpiryDate}
      />
      {expiryDate && (
        <DateInput
          label="Expiry date"
          onChange={(date) => onChange(date.getTime())}
          dateType={DateInputType.Date}
          value={expiryDate}
          className="flex-1"
        />
      )}
    </div>
  );
}
