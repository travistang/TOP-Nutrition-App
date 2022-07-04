import React from 'react';
import InputBase, { InputBaseProps } from './InputBase';

type Props = Omit<InputBaseProps, "children"> & {
  value: string;
  onChange: (newValue: string) => void;
  type?: string;
};

export default function TextInput({ type, label, className, value, onChange }: Props) {
  return (
    <InputBase label={label} className={className}>
      <div className="rounded-lg h-12 px-2 bg-violet-600 flex items-center overflow-hidden">
        <input type={type} className="bg-transparent outline-none flex-1 text-gray-100" value={value} onChange={e => onChange(e.target.value)} />
      </div>
    </InputBase>
  );
}