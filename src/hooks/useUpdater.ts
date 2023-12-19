export type Updater<T> = <K extends keyof T>(key: K) => (value: T[K]) => void;

export default function useUpdater<T>(value: T, setter: (t: T) => void) {
  const updater: Updater<T> = (key) => (newValue) =>
    setter({
      ...value,
      [key]: newValue,
    });
  return updater;
}
