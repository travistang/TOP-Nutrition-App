import React from 'react';

type Props = {
  label: string;
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export default function Modal({ label, opened, onClose, children}:Props) {
  if (!opened) return null;

  return (
    <div className="fixed z-50 inset-0 flex flex-col justify-end items-stretch bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="rounded-t-xl p-2 bg-violet-500 h-1/3 flex flex-col" onClick={e => e.stopPropagation()}>
        <span className="uppercase font-bold text-gray-200 text-sm">{label}</span>
        {children}
      </div>
    </div>
  )
}