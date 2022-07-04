import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  text?: string;
  icon?: IconProp;
  onClick: () => void;
  type?: "submit" | 'button' | 'reset';
}
export default function Button({ type, className, text, icon, onClick }:Props) {
  return (
    <button type={type} className={classNames("outline-none border-none", className)} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="text-gray-100" />}
      {text && <span className="text-gray-100">{text}</span>}
    </button>
  )
}