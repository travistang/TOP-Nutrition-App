import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  text: string;
  onClick?: () => void;
  color: string;
}
export default function Chip({ className, text, onClick, color }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames("flex flex-nowrap overflow-hidden text-ellipsis rounded-full", className)}
      style={{ backgroundColor: color }}
    >
      {text}
    </div>
  )
}