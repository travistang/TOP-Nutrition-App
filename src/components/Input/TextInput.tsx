import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import InputBase, { InputBaseProps } from './InputBase';

export type TextInputProps = Omit<InputBaseProps, "children"> & {
  value: string;
  placeholder?: string;
  inputClassName?: string;
  innerInputClassName?: string;
  onChange: (newValue: string) => void;
  type?: string;
  icon?: IconProp;
  children?: React.ReactNode;
};

export default function TextInput({
  placeholder,
  children,
  type,
  label,
  icon,
  className,
  inputClassName,
  innerInputClassName,
  value,
  onChange
}: TextInputProps) {
  return (
    <InputBase label={label} className={className}>
      <div className={classNames(
        "rounded-lg h-12 px-2 flex items-center overflow-hidden",
        inputClassName ?? "bg-blue-600"
      )}>
        {
          icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-4" />
        }
        <input
          placeholder={placeholder}
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          pattern={type === 'number' ? '\\d*' : undefined}
          className={classNames("bg-transparent outline-none flex-1", innerInputClassName ?? "text-gray-100")}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      {children}
    </InputBase>
  );
}