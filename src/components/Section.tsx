import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  className?: string;
};
export default function Section({ children, label, className }: Props) {
  return (
    <div
      className={classNames(
        "rounded-lg bg-gray-300 p-2 flex flex-col",
        className
      )}
    >
      <span className="text-xs">{label}</span>
      {children}
    </div>
  );
}
