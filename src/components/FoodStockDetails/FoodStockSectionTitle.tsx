import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  text?: string;
  icon?: IconProp;
  className?: string;
};
export default function FoodStockSectionTitle({
  text,
  icon,
  className,
}: Props) {
  return (
    <span className={classNames("flex items-center gap-2 text-sm", className)}>
      {icon && <FontAwesomeIcon icon={icon} className="h-8 w-8" />}
      {text}
    </span>
  );
}
