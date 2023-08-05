import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import Section from "../Section";

type Props = {
  className?: string;
  label: string;
  icon?: IconProp;
  disabled?: boolean;
  children: React.ReactNode;
  expanded?: boolean;
  headerComponent?: React.ReactNode;
  onToggleExpand: () => void;
};

export default function CollapsibleSection({
  className,
  children,
  label,
  icon,
  expanded,
  disabled,
  headerComponent,
  onToggleExpand,
}: Props) {
  return (
    <Section
      label={label}
      icon={icon}
      onClick={onToggleExpand}
      className={className}
      headerComponent={
        <>
          {headerComponent}
          {!disabled && (
            <div
              className={classNames(
                "transition-transform duration-300 linear rounded-full h-4 w-4 flex items-center justify-center",
                expanded && "-rotate-180"
              )}
            >
              <FontAwesomeIcon icon="caret-down" />
            </div>
          )}
        </>
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          "overflow-hidden transition-all duration-300 linear",
          expanded ? "max-h-screen" : "max-h-0"
        )}
      >
        {children}
      </div>
    </Section>
  );
}
