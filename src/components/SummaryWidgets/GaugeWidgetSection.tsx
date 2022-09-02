import classNames from 'classnames';
import React from 'react';
import Section from '../Section';
import GaugeWidget from './GaugeWidget';

type Props = {
  label: string;
  color: string;
  value: number;
  maxValue: number;
  className?: string;
}
export default function GaugeWidgetSection({ className, label, color, value, maxValue }:Props) {
  return (
    <Section label={label} className={classNames("flex flex-nowrap justify-around rounded-lg h-min bg-gray-300", className)}>
      <div className="flex flex-nowrap justify-around py-2 gap-2">
        <GaugeWidget
          unit="g"
          className="flex-1"
          color={color}
          value={value}
          maxValue={maxValue}
          label={label} />
      </div>
    </Section>
  )
}