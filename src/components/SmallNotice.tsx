import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  className?: string;
  iconClassName?: string;
  icon: IconProp;
  children: string;
};
export default function SmallNotice({
  iconClassName,
  className,
  icon,
  children,
}: Props) {
  return (
    <div className={classNames("flex items-center text-xs", className)}>
      <FontAwesomeIcon
        icon={icon}
        className={classNames("mr-2", iconClassName)}
      />
      {children}
    </div>
  );
}
