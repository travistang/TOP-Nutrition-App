import classNames from "classnames";
import React from "react";
import Section from "../Section";
import GaugeWidget from "./GaugeWidget";

type Props = {
  label: string;
  color: string;
  value: number;
  maxValue: number;
  className?: string;
  unit?: string;
};
export default function GaugeWidgetSection({
  className,
  label,
  color,
  value,
  maxValue,
  unit = "g",
}: Props) {
  return (
    <Section
      label={label}
      className={classNames(
        "flex flex-nowrap justify-around rounded-lg h-min bg-gray-300",
        className
      )}
    >
      <div className="flex flex-nowrap justify-around gap-2">
        <GaugeWidget
          unit={unit}
          className="flex-1"
          color={color}
          value={value}
          maxValue={maxValue}
          label={label}
        />
      </div>
    </Section>
  );
}
