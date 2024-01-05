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
  textarea?: boolean;
  inputClassName?: string;
  innerInputClassName?: string;
  onChange?: (newValue: string) => void;
  onFocusChanged?: (focused: boolean) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  icon?: IconProp;
  children?: React.ReactNode;
};

export default function TextInput({
  placeholder,
  children,
  label,
  icon,
  className,
  textarea,
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
          "rounded-lg px-2 flex items-center",
          inputClassName ?? "bg-gray-400",
          !textarea ? "h-12" : "min-h-36"
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-4" />}
        {textarea ? (
          <textarea
            className={classNames(
              "w-full rounded-lg",
              inputClassName ?? "bg-gray-400"
            )}
            placeholder={placeholder}
            onFocus={() => onFocusChanged?.(true)}
            onBlur={() => onFocusChanged?.(false)}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
          />
        ) : (
          <input
            ref={inputRef}
            placeholder={placeholder}
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
        )}
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
