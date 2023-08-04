import { addMonths, format, getMonth, setMonth, startOfYear } from "date-fns";
import ArrayUtils from "../../../utils/Array";
import SelectInput from "../SelectInput";

type Props = {
  value: Date;
  onChange: (d: Date) => void;
};
export default function ShortMonthPicker({ value, onChange }: Props) {
  const yearStart = startOfYear(Date.now());
  const selectOptions = ArrayUtils.range(12).map((n) => {
    const dateWithMonth = addMonths(yearStart, n);
    return {
      label: format(dateWithMonth, "MMMMMM"),
      value: n.toString(),
    };
  });
  return (
    <SelectInput
      className=" items-center rounded-full"
      value={getMonth(value).toString()}
      onSelect={(n) => onChange(setMonth(value, parseInt(n)))}
      options={selectOptions}
    />
  );
}
