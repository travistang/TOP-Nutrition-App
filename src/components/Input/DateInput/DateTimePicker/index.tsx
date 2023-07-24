import classNames from "classnames";
import { DateInputType } from "..";
import Calendar from "../../../Calendar";
import Button, { ButtonStyle } from "../../Button";
import MonthListPicker from "../MonthListPicker";
import ShortMonthPicker from "../ShortMonthPicker";
import TimeInputWidget from "../TimeInputWidget";
import YearPicker from "../YearPicker";

enum DateInputDisplay {
  Year = 1,
  Month = 1 << 1,
  ShortMonth = 1 << 2,
  Date = 1 << 3,
  Time = 1 << 4,
}

const displaysFromMode: Record<DateInputType, number> = {
  [DateInputType.Date]:
    DateInputDisplay.Year | DateInputDisplay.Month | DateInputDisplay.Date,
  [DateInputType.Month]: DateInputDisplay.Year | DateInputDisplay.Month,
  [DateInputType.DateTime]:
    DateInputDisplay.Year |
    DateInputDisplay.ShortMonth |
    DateInputDisplay.Date |
    DateInputDisplay.Time,
};

const hasDisplayGenerator = (allDisplays: number) => (display: number) =>
  !!(allDisplays & display);

type Props = {
  mode: DateInputType;
  value: Date;
  onSelectDate: (d: Date, keepTime?: boolean) => void;
  onClear?: () => void;
  withNowButton?: boolean;
  className?: string;
  calendarClassName?: string;
};
export default function DateTimePicker({
  value,
  onSelectDate,
  onClear,
  mode,
  className,
  withNowButton,
  calendarClassName,
}: Props) {
  const displays = displaysFromMode[mode];
  const hasDisplay = hasDisplayGenerator(displays);
  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-2 w-full flex-1",
        className
      )}
    >
      {hasDisplay(DateInputDisplay.Year) && (
        <YearPicker value={value} onChange={(d) => onSelectDate(d, true)} />
      )}
      {hasDisplay(DateInputDisplay.Month) && (
        <MonthListPicker
          value={value}
          onChange={(d) => onSelectDate(d, true)}
        />
      )}

      {hasDisplay(DateInputDisplay.ShortMonth) && (
        <ShortMonthPicker
          value={value}
          onChange={(d) => onSelectDate(d, true)}
        />
      )}
      {hasDisplay(DateInputDisplay.Date) && (
        <Calendar
          date={value}
          selectedDate={new Date(value)}
          onSelectDate={(d) => onSelectDate(d, true)}
          className={calendarClassName ?? "gap-y-4"}
        />
      )}
      {hasDisplay(DateInputDisplay.Time) && (
        <div className="flex items-center justify-between mt-2 overflow-hidden">
          <TimeInputWidget
            value={value}
            onChange={(d) => onSelectDate(d, false)}
          />
        </div>
      )}
      <div className="flex justify-between items-center gap-2">
        {onClear && (
          <Button
            onClick={onClear}
            icon="trash"
            text="Clear"
            buttonStyle={ButtonStyle.Clear}
            className="text-red-500"
            textClassName="text-red-500 child:fill-red-500"
          />
        )}
        {withNowButton && (
          <Button
            buttonStyle={ButtonStyle.Clear}
            onClick={() => onSelectDate(new Date(), false)}
            icon="clock"
            className="h-10 px-2 w-max"
            text="Set to now"
          />
        )}
      </div>
    </div>
  );
}
