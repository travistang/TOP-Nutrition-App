import React from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  className?: string;
  textClassName?: string;
  text?: string;
  icon?: IconProp;
  onClick: () => void;
  type?: "submit" | 'button' | 'reset';
}
export default function Button({ type, className, text, icon, onClick, textClassName }:Props) {
  return (
    <button type={type} className={classNames("outline-none border-none", className)} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className={textClassName} />}
      {text && <span className={textClassName}>{text}</span>}
    </button>
  )
}