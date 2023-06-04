import React from "react";
import classNames from "classnames";

type Props = {
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  label?: string;
  children?: React.ReactNode;
};
export default function AttributeValue({
  label,
  className,
  selected,
  onClick,
  children,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-lg flex h-20 p-2 items-center",
        selected ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700",
        className
      )}
    >
      <div className="flex flex-col flex-1 justify-center gap-2">
        <span
          className={classNames(
            "text-xs capitalize",
            selected && "text-gray-100"
          )}
        >
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}
