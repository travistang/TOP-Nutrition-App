import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  label: string;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  blink?: boolean;
};
export default function Section({
  style,
  onClick,
  children,
  label,
  className,
  labelClassName,
  blink,
}: Props) {
  return (
    <div
      style={style}
      onClick={onClick}
      className={classNames(
        "rounded-lg bg-gray-300 p-2 flex flex-col",
        blink && "animate-blink",
        className
      )}
    >
      <span className={classNames("text-xs font-bold", labelClassName)}>
        {label}
      </span>
      {children}
    </div>
  );
}
