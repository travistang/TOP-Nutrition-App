import React, { useRef } from "react";
import { setMinutes, setHours, getHours, getMinutes } from "date-fns";
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
    <div className="flex flex-nowrap gap-1 overflow-hidden items-center">
      <TimeInput
        onShiftFocus={() => minuteRef.current?.focus()}
        onChange={(n) => onChange(setHours(value, n))}
        value={hour}
        ref={hourRef}
        max={23}
        shiftFocusThreshold={3}
      />
      :
      <TimeInput
        onChange={(n) => onChange(setMinutes(value, n))}
        onShiftFocus={() => minuteRef.current?.blur()}
        value={minute}
        ref={minuteRef}
        max={59}
        shiftFocusThreshold={6}
      />
    </div>
  );
}
