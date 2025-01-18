import { ChartData } from "chart.js";
import classNames from "classnames";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import Section from "../Section";

const chartOptions = {
  animation: { duration: 1000 },
  plugins: { tooltip: { enabled: false }, legend: { display: false } },
};
type Props = {
  label: string;
  className?: string;
  children?: React.ReactNode;
  data: ChartData<"doughnut", number[], unknown>;
};
export default function DoughnutWidget({
  label,
  children,
  className,
  data,
}: Props) {
  return (
    <Section label={label} className={classNames("overflow-hidden", className)}>
      <Doughnut data={data} options={chartOptions} />
      {children}
    </Section>
  );
}
