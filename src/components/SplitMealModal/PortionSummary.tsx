import classNames from "classnames";
import React from "react";

type Props = {
  calories: number;
  title: string;
  ratio: number;
  className?: string;
  reversed?: boolean;
};
export default function PortionSummary({
  title,
  className,
  calories,
  ratio,
  reversed,
}: Props) {
  const caloriesString = calories.toFixed(1);
  return (
    <div
      className={classNames(
        "flex items-center gap-2",
        reversed && "flex-row-reversed",
        className
      )}
    >
      <div className="flex flex-col">
        <h4
          className={classNames("text-xs font-bold", reversed && "text-right")}
        >
          {title}
        </h4>
        <div
          className={classNames("flex gap-2", reversed && "flex-row-reverse")}
        >
          <h3 className="text-xl font-bold">
            {caloriesString}
            <span className="text-xs">kcal</span>
          </h3>
          <div className="text-xl">{(ratio * 100).toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
