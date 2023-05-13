import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import Button, { ButtonStyle } from "./Button";
import InputBase, { InputBaseProps } from "./InputBase";

export type TextInputProps = Omit<InputBaseProps, "children"> & {
  value: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  placeholder?: string;
  inputClassName?: string;
  innerInputClassName?: string;
  onChange?: (newValue: string) => void;
  onFocusChanged?: (focused: boolean) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
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
  inputRef,
  onChange,
  onKeyDown,
  onFocusChanged,
}: TextInputProps) {
  const disabled = !onChange;
  return (
    <InputBase label={label} className={className}>
      <div
        className={classNames(
          "rounded-lg h-12 px-2 flex items-center",
          inputClassName ?? "bg-gray-400"
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-4" />}
        <input
          ref={inputRef}
          placeholder={placeholder}
          type={type}
          inputMode={type === "number" ? "decimal" : undefined}
          pattern={type === "number" ? "\\d*" : undefined}
          onFocus={() => onFocusChanged?.(true)}
          onBlur={() => onFocusChanged?.(false)}
          onKeyDown={onKeyDown}
          className={classNames(
            "bg-transparent outline-none flex-1 w-[80%]",
            disabled && "bg-opacity-70 text-opacity-70 cursor-not-allowed",
            innerInputClassName ?? "text-gray-100"
          )}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {!!value && !disabled && (
          <Button
            icon="times"
            buttonStyle={ButtonStyle.Clear}
            onClick={() => onChange?.("")}
          />
        )}
      </div>
      {children}
    </InputBase>
  );
}
