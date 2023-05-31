import classNames from "classnames";
import React from "react";

type Props = {
  size?: "lg" | "sm";
  className?: string;
  unitClassName?: string;
  integer?: boolean;
  value: number;
  unit?: string;
};
export default function TextWithUnit({
  size = "lg",
  value,
  integer,
  unit,
  className,
  unitClassName,
}: Props) {
  const valueString = integer ? value.toFixed(0) : value.toFixed(1);
  return (
    <div
      className={classNames(
        "flex gap-1",
        { "text-lg font-bold": size === "lg", "text-xs": size === "sm" },
        className
      )}
    >
      {valueString}{" "}
      <sub
        className={classNames(
          "self-end mb-1",
          size === "lg" && "text-sm font-bold",
          size === "sm" && "text-xs",
          unitClassName
        )}
      >
        {unit ?? ""}
      </sub>
    </div>
  );
}
