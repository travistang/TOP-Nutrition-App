import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
  onClick: () => void;
};

export default function AddContainerEntryButton({ onClick, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "outline-none flex items-center justify-center gap-2",
        "rounded-lg border-2 border-dotted border-gray-800",
        className
      )}
    >
      <FontAwesomeIcon icon="plus" className="w-6 h-6 child:fill-gray-800" />
      <span className="text-xs uppercase text-gray-800">Add container</span>
    </button>
  );
}
