import React from "react";
import Section from "../Section";

type Props = {
  value: number | null;
  extraInfo?: string;
  unit?: string;
  style?: React.CSSProperties;
  className?: string;
  label: string;
};
export default function ScalarWidget({
  value,
  unit,
  style,
  className,
  label,
  extraInfo,
}: Props) {
  return (
    <Section
      style={style}
      className={className}
      label={label}
      labelClassName="font-bold">
      <div className="flex flex-col">
        <div className="capitalize font-bold text-xl">
          {value === null ? "N/A" : `${value.toFixed(1)} ${unit ?? ''}`}
        </div>
        {extraInfo && <span className="text-xs">{extraInfo}</span>}
      </div>
    </Section>
  );
}
