import React, { useState } from "react";
import Section from "../../Section";
import SelectInput from "../../Input/SelectInput";
import { Duration } from "../../../types/Duration";
import DateInput from "../../Input/DateInput";
import { DateInputType } from "../../Input/DateInput/types";

type Props = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

type BaseChartSectionContextProps = {
  date: Date;
  duration: Duration;
};

const DEFAULT_CONTEXT_PROPS = {
  date: new Date(),
  duration: Duration.OneMonth,
};
export const baseChartSectionContext =
  React.createContext<BaseChartSectionContextProps>(DEFAULT_CONTEXT_PROPS);

export default function BaseChartSection({
  label,
  className,
  children,
}: Props) {
  const [baseCharSectionContextValue, setContextValues] =
    useState<BaseChartSectionContextProps>(DEFAULT_CONTEXT_PROPS);
  const { date, duration } = baseCharSectionContextValue;
  return (
    <baseChartSectionContext.Provider value={baseCharSectionContextValue}>
      <Section label={label} className={className}>
        <div className="grid grid-cols-6 gap-2">
          <DateInput
            dateType={DateInputType.Month}
            className="col-span-4"
            inputClassName="bg-gray-400"
            value={date}
            onChange={(date) =>
              setContextValues((contextValue) => ({
                ...contextValue,
                date,
              }))
            }
          />
          <SelectInput
            className="col-span-2"
            inputClassName="bg-gray-400"
            label=""
            value={duration}
            onSelect={(v) =>
              setContextValues((contextValue) => ({
                ...contextValue,
                duration: v as Duration,
              }))
            }
            options={Object.values(Duration).map((dur) => ({
              label: dur,
              value: dur,
            }))}
          />
        </div>
        {children}
      </Section>
    </baseChartSectionContext.Provider>
  );
}
