import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

type Props = {
  className?: string;
  icon: IconProp;
  children: string;
};
export default function SmallNotice({ className, icon, children }: Props) {
  return (
    <div className={classNames("flex items-center text-xs", className)}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
    </div>
  );
}
