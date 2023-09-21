import classNames from "classnames";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";

type Props = {
  className?: string;
};
export default function ChallengeSummary({ className }: Props) {
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <StatisticsNavigateTab />
      WIP
    </div>
  );
}
