import classNames from "classnames";
import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
};
export default function FoodContainerItemRow({ children, className }: Props) {
  return (
    <div
      className={classNames(
        "flex gap-2 items-center rounded-lg bg-gray-300 p-2",
        className
      )}
    >
      {children}
    </div>
  );
}
