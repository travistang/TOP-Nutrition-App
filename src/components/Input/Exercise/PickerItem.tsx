import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  selected?: boolean;
  className?: string;
  onToggle?: () => void;
  label?: string;
  icon?: IconProp;
};
export default function PickerItem({
  selected,
  className,
  onToggle,
  label,
  icon,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className={classNames(
        "flex items-center justify-center gap-2 capitalize rounded-lg border border-gray-800 px-2",
        selected ? "bg-gray-800 text-gray-200" : "text-gray-800",
        className
      )}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={classNames(selected && "child:fill-gray-200")}
        />
      )}
      {label}
    </div>
  );
}
