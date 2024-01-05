import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export type TabConfig = {
  id?: string;
  label?: string;
  icon?: IconProp;
  onClick: () => void;
};
type Props = {
  className?: string;
  iconOnly?: boolean;
  options: TabConfig[];
  selected: (tabConfig: TabConfig) => boolean;
};

export default function Tab({ iconOnly, className, options, selected }: Props) {
  return (
    <div className={classNames("h-10  flex flex-row flex-nowrap", className)}>
      {options.map(({ id, label, icon, onClick }) => (
        <span
          key={(icon as string) ?? label}
          onClick={onClick}
          className={classNames(
            "text-xs h-10 flex-1 first:rounded-l-lg last:rounded-r-lg border border-gray-900 flex items-center justify-center",
            selected({ id, label, onClick })
              ? "bg-gray-900 text-gray-200"
              : "text-gray-900 bg-gray-200"
          )}
        >
          {icon && (
            <FontAwesomeIcon
              className={classNames(
                "w-4 h-4 mx-2",
                selected({ id, label, onClick }) && "child:fill-gray-50"
              )}
              icon={icon}
            />
          )}{" "}
          {!iconOnly && label}
        </span>
      ))}
    </div>
  );
}
