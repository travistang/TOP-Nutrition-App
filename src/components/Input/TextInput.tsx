import React from 'react';
import InputBase, { InputBaseProps } from './InputBase';

export type TextInputProps = Omit<InputBaseProps, "children"> & {
  value: string;
  onChange: (newValue: string) => void;
  type?: string;
  children?: React.ReactNode;
};

export default function TextInput({ children, type, label, className, value, onChange }: TextInputProps) {
  return (
    <InputBase label={label} className={className}>
      <div className="rounded-lg h-12 px-2 bg-blue-600 flex items-center overflow-hidden">
        <input
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          className="bg-transparent outline-none flex-1 text-gray-100"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      {children}
    </InputBase>
  );
}