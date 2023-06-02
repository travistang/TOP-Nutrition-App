import classNames from "classnames";
import React from "react";

type Props = {
  text: string;
  className?: string;
};
export default function ExerciseSectionTitle({ text, className }: Props) {
  return (
    <div
      className={classNames(
        "text-xs self-center w-full text-center py-2 font-bold text-gray-700",
        className
      )}
    >
      {text}
    </div>
  );
}
