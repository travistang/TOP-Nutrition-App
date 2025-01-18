import classNames from "classnames";
import Section from "../Section";
import GaugeWidget from "./GaugeWidget";

type Props = {
  label: string;
  color: string;
  value: number;
  maxValue: number | null;
  className?: string;
  onClick?: () => void;
  unit?: string;
};
export default function GaugeWidgetSection({
  className,
  label,
  color,
  value,
  maxValue,
  onClick,
  unit = "g",
}: Props) {
  return (
    <Section
      onClick={onClick}
      label={label}
      className={classNames(
        "flex flex-nowrap justify-around rounded-lg h-min bg-gray-300",
        className
      )}
    >
      <div
        className={classNames(
          "flex flex-nowrap justify-around gap-2",
          maxValue !== null && "-mt-4"
        )}
      >
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
