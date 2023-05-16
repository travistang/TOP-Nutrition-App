import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
};
export default function Section({
  style,
  children,
  label,
  className,
  labelClassName,
}: Props) {
  return (
    <div
      style={style}
      className={classNames(
        "rounded-lg bg-gray-300 p-2 py-0 flex flex-col",
        className
      )}
    >
      <span
        className={classNames(
          "text-xs font-bold sticky top-0 bg-gray-300 pt-2 pb-1",
          labelClassName
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
