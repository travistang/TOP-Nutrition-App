import { useRef, useState } from "react";

export default function useDelayState<T>(defaultValue: T, delay = 300) {
  const [state, setState] = useState<T>(defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setStateWithDelay = (newState: T) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setState(newState);
    }, delay);

    return () => clearTimeout(timeoutRef.current ?? undefined);
  }
  return [state, setStateWithDelay] as const;
}