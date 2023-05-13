import { useEffect, useRef } from "react";
import DatabaseSynchronization from ".";

export default function useDatabaseSynchronization() {
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      await DatabaseSynchronization.synchronizeWithRemote();
    }, 10000);

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
