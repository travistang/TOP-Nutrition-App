import React from "react";

type Props = {
  label: string;
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export default function Modal({ label, opened, onClose, children }: Props) {
  if (!opened) return null;

  return (
    <div
      className="overflow-y-auto fixed z-50 inset-0 flex flex-col justify-end items-stretch"
      onClick={onClose}
    >
      <div className="flex-1 bg-opacity-50 backdrop-blur-sm" />
      <div
        className="rounded-t-xl p-2 bg-blue-500 min-h-1/3 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-gray-200">{label}</span>
        {children}
      </div>
    </div>
  );
}
