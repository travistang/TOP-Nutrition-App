import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FoodAmountTrackingType } from "../../../../../types/FoodAmountTracking";
import { Option } from "../../../../Input/TabSelectInput";

type Props = {
  selected: boolean;
  option: Option<FoodAmountTrackingType | null>;
  onSelect: () => void;
};

export default function FoodTrackingModePickerOption({
  selected,
  option,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      key={option.value}
      className={classNames(
        "cursor-pointer flex gap-4 rounded-lg items-center justify-center h-12 px-2",
        selected ? "bg-gray-800 text-white" : "bg-gray-300"
      )}
    >
      {option.icon && (
        <FontAwesomeIcon
          icon={option.icon}
          className={classNames("text-xl", selected && "child:fill-white")}
        />
      )}
      <span className={classNames("text-xs", selected && "text-white")}>
        {option.text}
      </span>
    </div>
  );
}
