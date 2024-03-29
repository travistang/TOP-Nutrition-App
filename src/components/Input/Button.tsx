import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";

export enum ButtonStyle {
  Block,
  BlockSecondary,
  Clear,
  BlockDanger,
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
    active: {
      button: "bg-gray-900",
      text: "text-gray-200 child:fill-gray-200",
    },
  },
  [ButtonStyle.BlockDanger]: {
    disabled: {
      button: "bg-red-100 cursor-not-allowed",
    },
    active: { button: "bg-red-300", text: "text-red-500 child:fill-red-500" },
  },
  [ButtonStyle.BlockSecondary]: {
    disabled: {
      button: "bg-gray-300 cursor-not-allowed",
    },
    active: { button: "bg-gray-400", text: "text-gray-200" },
  },
  [ButtonStyle.Clear]: {
    disabled: { text: "text-opacity-50 cursor-not-allowed" },
    active: {},
  },
};
export type Props = {
  className?: string;
  textClassName?: string;
  text?: string;
  icon?: IconProp;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
  circle?: boolean;
  type?: "submit" | "button" | "reset";
};
export default function Button({
  type = "button",
  className,
  text,
  icon,
  onClick,
  disabled,
  circle,
  buttonStyle = ButtonStyle.Block,
  textClassName,
}: Props) {
  const styles = buttonStyles[buttonStyle][disabled ? "disabled" : "active"];
  const [onClickRunning, setOnClickRunning] = useState(false);
  const shouldDisableButton = disabled || onClickRunning;

  const onClickWithDisable = async (e: React.MouseEvent) => {
    if (shouldDisableButton) return;
    setOnClickRunning(true);
    try {
      await onClick(e);
    } finally {
      setOnClickRunning(false);
    }
  };

  return (
    <button
      type={type}
      className={classNames(
        "flex items-center justify-center outline-none border-none gap-2 p-2",
        circle ? "rounded-full" : "rounded-lg",
        disabled && "opacity-70 cursor-not-allowed",
        styles?.button,
        className
      )}
      onClick={onClickWithDisable}
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
