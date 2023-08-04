import { useState } from "react";

type UseToggleParams<T> = {
  initialValue?: T[];
  multiple?: boolean;
};

export default function useToggle<T>({
  multiple,
  initialValue = [],
}: UseToggleParams<T>) {
  const [selectedValue, setSelectedValue] = useState<T[]>(initialValue);

  const onSelect = (value: T) => {
    const isValueSelected = selectedValue.includes(value);
    if (isValueSelected) {
      setSelectedValue(selectedValue.filter((v) => v !== value));
      return;
    }

    if (multiple) {
      setSelectedValue([...selectedValue, value]);
      return;
    }

    setSelectedValue([value]);
  };

  const selected = (value: T) => {
    return selectedValue.includes(value);
  };

  return {
    selected,
    onSelect,
  };
}
