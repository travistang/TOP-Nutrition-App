import classNames from "classnames";
import React from "react";
import AutoCompleteResultsLoadingPlaceholder from "./AutoCompleteResultLoadingPlaceholder";

type Props<T> = {
  inline?: boolean;
  loading?: boolean;
  results: T[];
  renderResult: (result: T) => React.ReactNode;
  onSelectResult: (result: T) => void;
  className?: string;
};
export default function AutoCompleteResultPanel<T>({
  className,
  inline,
  loading,
  results,
  renderResult,
  onSelectResult,
}: Props<T>) {
  return (
    <div
      className={classNames(
        "overflow-y-auto overflow-x-hidden flex flex-col",
        inline
          ? "max-h-48 gap-2 px-2"
          : "z-40 absolute top-full rounded-lg translate-y-2 left-0 right-0 bg-gray-300",
        className
      )}
    >
      {loading && <AutoCompleteResultsLoadingPlaceholder />}
      {!loading &&
        results.map((result) => (
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
