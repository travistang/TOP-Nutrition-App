import React from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onClick: () => void;
  className?: string;
  icon: IconProp;
};
export default function Fab({ onClick, className, icon }: Props) {
  return (
    <button className={classNames("absolute bottom-4 right-4 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center z-50", className)} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="text-gray-200 fill-gray-200" />
    </button>
  );
}