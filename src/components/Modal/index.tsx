import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

type Props = {
  label: string;
  opened: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function Modal({
  className,
  label,
  opened,
  onClose,
  children,
}: Props) {
  if (!opened) return null;

  return (
    <div
      className={classNames(
        "overflow-y-auto fixed z-50 inset-0 flex flex-col justify-end items-stretch backdrop-blur-sm",
        className
      )}
      onClick={onClose}
    >
      <div className="flex-1 bg-opacity-50 backdrop-blur-sm" />
      <div
        className="shadow-xl rounded-t-xl p-2 bg-gray-200 min-h-1/3 flex flex-col max-h-[100vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between text-sm sticky -top-2 bg-gray-200 z-10 -mt-2 py-2">
          <span>{label}</span>
          <FontAwesomeIcon
            icon="times"
            className="w-4 h-4 child:fill-gray-700"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
