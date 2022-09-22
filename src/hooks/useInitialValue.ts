import { useEffect, useState } from 'react';

export default function useInitialValue<T>(initialValue: T | null) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (value === null && initialValue !== null) {
      setValue(initialValue);
    };
  }, [value, initialValue]);
  return value;
}