import classNames from "classnames";
import React from "react";

export type InputBaseProps = {
  label: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function InputBase({
  onClick,
  label,
  className,
  labelClassName,
  children,
}: InputBaseProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "relative flex flex-col gap-2 items-stretch",
        className
      )}
    >
      <div className={classNames(labelClassName ?? "text-xs leading-3")}>
        {label}
      </div>
      {children}
    </div>
  );
}
