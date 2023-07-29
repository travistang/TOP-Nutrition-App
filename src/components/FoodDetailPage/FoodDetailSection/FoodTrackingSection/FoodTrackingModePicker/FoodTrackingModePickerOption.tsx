import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  selected?: boolean;
  type: FoodAmountTrackingType | "none";
  onSelect?: () => void;
  className?: string;
};

const CONFIG: Record<
  FoodAmountTrackingType | "none",
  { text: string; icon: IconProp }
> = {
  none: {
    text: "None",
    icon: "times",
  },
  [FoodAmountTrackingType.Individual]: {
    text: "Individual",
    icon: "egg",
  },
  [FoodAmountTrackingType.Simple]: {
    text: "Simple",
    icon: "jar",
  },
  [FoodAmountTrackingType.IdenticalIndividual]: {
    text: "Individual and identical container",
    icon: "cubes-stacked",
  },
  [FoodAmountTrackingType.Container]: {
    text: "In containers",
    icon: "boxes-stacked",
  },
};

export default function FoodTrackingModePickerOption({
  selected,
  onSelect,
  type,
  className,
}: Props) {
  const config = CONFIG[type];
  return (
    <div
      onClick={onSelect}
      className={classNames(
        "cursor-pointer flex gap-4 rounded-lg items-center justify-center h-12 px-2",
        selected ? "bg-gray-800 text-white" : "bg-gray-300",
        className
      )}
    >
      {config.icon && (
        <FontAwesomeIcon
          icon={config.icon}
          className={classNames("text-xl", selected && "child:fill-white")}
        />
      )}
      <span className={classNames("text-xs", selected && "text-white")}>
        {config.text}
      </span>
    </div>
  );
}
