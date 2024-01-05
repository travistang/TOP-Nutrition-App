import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  className?: string;
  iconClassName?: string;
  text?: string;
  icon?: IconProp;
  onClick?: () => void;
  color: string;
};
export default function Chip({
  iconClassName,
  className,
  icon,
  text,
  onClick,
  color,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex flex-nowrap overflow-hidden text-ellipsis rounded-full",
        className
      )}
      style={{ backgroundColor: color }}
    >
      {icon && <FontAwesomeIcon className={iconClassName} icon={icon} />}
      {text}
    </div>
  );
}
