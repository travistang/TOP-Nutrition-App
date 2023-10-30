import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { useRef } from "react";
import TimeInput from "./TimeInput";
type Props = {
  value: Date;
  onChange: (d: Date) => void;
};
export default function TimeInputWidget({ value, onChange }: Props) {
  const hourRef = useRef<HTMLInputElement | null>(null);
  const minuteRef = useRef<HTMLInputElement | null>(null);
  const hour = getHours(value);
  const minute = getMinutes(value);
  return (
    <div className="flex flex-row items-center overflow-hidden gap-2 text-xl">
      <TimeInput
        onChange={(n) => onChange(setHours(value, n))}
        value={hour}
        ref={hourRef}
        max={23}
      />
      :
      <TimeInput
        onChange={(n) => onChange(setMinutes(value, n))}
        value={minute}
        ref={minuteRef}
        max={59}
      />
    </div>
  );
}
