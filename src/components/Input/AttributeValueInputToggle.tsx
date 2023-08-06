import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import AttributeValue from "./AttributeValue";

export type AttributeValueOptions<T> = {
  value: T;
  icon?: IconProp;
  label?: string;
};

type Props<T> = {
  options: AttributeValueOptions<T>[];
  noMatchMessage?: React.ReactNode;
  selected?: boolean;
  label: string;
  className?: string;
  value: T | null;
  onToggle: () => void;
};
export default function AttributeValueInputToggle<T>({
  options,
  label,
  noMatchMessage: NoMatchMessage,
  selected,
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
      selected={selected}
    >
      <div className="flex gap-1 justify-end items-center h-8">
        {selectedOption?.label && (
          <span
            className={classNames(
              "text-xs capitalize",
              selected && "text-gray-100"
            )}
          >
            {selectedOption.label}
          </span>
        )}
        {selectedOption?.icon && (
          <FontAwesomeIcon
            icon={selectedOption.icon}
            className={classNames("h-4 w-4", selected && "child:fill-gray-100")}
          />
        )}
        {!selectedOption && NoMatchMessage}
      </div>
    </AttributeValue>
  );
}
