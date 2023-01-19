import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

type Props = {
  icon: IconProp;
  message: string;
  onClick?: () => void;
  className?: string;
};
export default function EmptyNotice({ className, onClick, icon, message }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-full w-full flex flex-col gap-2 items-center justify-center text-center text-sm",
        !!onClick && "cursor-pointer",
        className)}
    >
      <FontAwesomeIcon icon={icon} className="text-3xl" />
      {message}
    </div>
  );
}