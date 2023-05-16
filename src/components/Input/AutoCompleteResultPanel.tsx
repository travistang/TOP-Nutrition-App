import classNames from "classnames";
import React from "react";

type Props<T> = {
  inline?: boolean;
  results: T[];
  renderResult: (result: T) => React.ReactNode;
  onSelectResult: (result: T) => void;
  className?: string;
};
export default function AutoCompleteResultPanel<T>({
  className,
  inline,
  results,
  renderResult,
  onSelectResult,
}: Props<T>) {
  return (
    <div
      className={classNames(
        "max-h-36 overflow-y-auto overflow-x-hidden",
        inline
          ? "flex flex-col max-h-36 gap-2 px-2"
          : "z-40 absolute top-full rounded-lg translate-y-2 left-0 right-0 bg-gray-300",
        className
      )}
    >
      {results.map((result) => (
        <div
          key={JSON.stringify(result)}
          className="hover:bg-gray-400 h-14 py-1 px-2"
          onClick={() => onSelectResult(result)}
        >
          {renderResult(result)}
        </div>
      ))}
    </div>
  );
}
