import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  label: string | React.ReactNode;
  icon?: IconProp;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
  headerComponent?: React.ReactNode;
  onClick?: () => void;
  blink?: boolean;
};
export default function Section({
  style,
  onClick,
  children,
  label,
  icon,
  className,
  labelClassName,
  headerComponent,
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
      <div
        className={classNames(
          "text-xs font-bold flex items-center gap-2",
          labelClassName
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {label}
        {headerComponent && (
          <>
            <div className="flex-1" />
            {headerComponent}
          </>
        )}
      </div>
      {children}
    </div>
  );
}
