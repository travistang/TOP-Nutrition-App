import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Tab from '../Tab';

export type Option<T> = {
  icon?: IconProp;
  text?: string;
  value: T;
}

type Props<T> = {
  label?: React.ReactNode;
  options: Option<T>[];
  selected: T;
  iconOnly?: boolean;
  onSelect: (value: T) => void;
}
export default function TabSelectInput<T>({ iconOnly, label, options, selected, onSelect}: Props<T>) {
  const selectedOption = options.find(opt => opt.value === selected);
  return (
    <>
      <span className="text-xs">
        {label}
      </span>
      <Tab
        iconOnly={iconOnly}
        selected={(config) => !!selectedOption?.text && (config.label === selectedOption?.text)}
        options={options
          .map(opt => ({
            label: opt.text,
            icon: opt.icon,
            onClick: () => onSelect(opt.value)
          }))
        }
      />
    </>
  )
}