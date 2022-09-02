import React from 'react';
import Section from '../Section';

type Props = {
  value: number;
  unit?: string;
  className?: string;
  label: string;
}
export default function ScalarWidget({ value, unit, className, label}:Props) {
  return (
    <Section className={className} label={label}>
      <span className="capitalize font-bold">{value}{unit}</span>
    </Section>
  )
}