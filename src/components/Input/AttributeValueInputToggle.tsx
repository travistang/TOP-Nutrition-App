import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AttributeValue from "./AttributeValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type AttributeValueOptions<T> = {
  value: T;
  icon?: IconProp;
  label?: string;
};

type Props<T> = {
  options: AttributeValueOptions<T>[];
  noMatchMessage?: React.ReactNode;
  label: string;
  className?: string;
  value: T | null;
  onToggle: () => void;
};
export default function AttributeValueInputToggle<T>({
  options,
  label,
  noMatchMessage: NoMatchMessage,
  className,
  value,
  onToggle,
}: Props<T>) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <AttributeValue
      label={label}
      className={className}
      onClick={onToggle}
      selected={!!selectedOption}
    >
      <div className="flex gap-1 justify-end items-center h-8">
        {selectedOption?.label && (
          <span className="text-xs text-gray-100 capitalize">
            {selectedOption.label}
          </span>
        )}
        {selectedOption?.icon && (
          <FontAwesomeIcon
            icon={selectedOption.icon}
            className="h-4 w-4 child:fill-gray-100"
          />
        )}
        {!selectedOption && NoMatchMessage}
      </div>
    </AttributeValue>
  );
}
