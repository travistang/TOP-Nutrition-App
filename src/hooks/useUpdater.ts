import { useCallback } from "react";

export type Updater<T> = <K extends keyof T>(key: K) => (value: T[K]) => void;

export default function useUpdater<T>(value: T, setter: (t: T) => void) {
  const updater: Updater<T> = useCallback(
    (key) => (newValue) =>
      setter({
        ...value,
        [key]: newValue,
      }),
    [setter, value]
  );
  return updater;
}
