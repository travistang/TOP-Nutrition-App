import { differenceInSeconds, differenceInMinutes } from 'date-fns';
import React, { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  time: Date | number;
}
export default function TimerText({ time, className }:Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const dSeconds = Math.abs(differenceInSeconds(time, now)) % 60
      const dMinutes = Math.abs(differenceInMinutes(time, now))
      if (ref?.current) {
        ref.current.textContent = `${dMinutes.toString().padStart(2, "0")}:${dSeconds.toString().padStart(2, "0")}`
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time])

  return (
    <span ref={ref} className={className}>
      --:--
    </span>
  )
}