import React from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum ButtonStyle {
  Block,
  Clear,
}

type StyleConfig = {
  button?: string;
  text?: string;
};
const buttonStyles: Record<
  ButtonStyle,
  { disabled?: StyleConfig; active?: StyleConfig }
> = {
  [ButtonStyle.Block]: {
    disabled: {
      button: "bg-gray-400 cursor-not-allowed",
    },
    active: { button: "bg-gray-900", text: "text-gray-200" },
  },
  [ButtonStyle.Clear]: {
    disabled: { text: "text-opacity-50 cursor-not-allowed" },
    active: {},
  },
};
type Props = {
  className?: string;
  textClassName?: string;
  text?: string;
  icon?: IconProp;
  onClick: () => void;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  type?: "submit" | "button" | "reset";
};
export default function Button({
  type,
  className,
  text,
  icon,
  onClick,
  disabled,
  buttonStyle = ButtonStyle.Block,
  textClassName,
}: Props) {
  const styles = buttonStyles[buttonStyle][disabled ? "disabled" : "active"];
  return (
    <button
      type={type}
      className={classNames(
        "flex items-center justify-center outline-none border-none rounded-lg",
        styles?.button,
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={classNames(styles?.text, textClassName)}
        />
      )}
      {text && (
        <span className={classNames(styles?.text, textClassName)}>{text}</span>
      )}
    </button>
  );
}
