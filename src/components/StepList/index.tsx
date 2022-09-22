import React from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  stepIcons: IconProp[];
  currentStep: number;
  className?: string;
};

export default function StepList({ stepIcons, currentStep, className }: Props) {
  if (stepIcons.length === 0) return null;
  return (
    <div className={classNames("flex flex-row flex-nowrap items-center", className)}>
      {
        stepIcons.map((icon, index) => (
          <div className="contents" key={JSON.stringify(icon)}>
            {index !== 0 && <div className={classNames("flex-1 h-2 rounded-full -mx-1", currentStep >= index ? "bg-gray-900" : "bg-gray-400")} />}
            <div className={classNames(
              "z-10 h-8 w-8 flex items-center justify-center rounded-full",
              currentStep >= index ? "bg-gray-900" : "bg-gray-400"
            )}>
              <FontAwesomeIcon
                icon={icon}
                className={classNames(
                  "h-4 w-4",
                  currentStep >= index ? "child:fill-gray-50" : "chil:fill-gray-900"
                )}
              />
            </div>
          </div>
        ))
      }
    </div>
  );
}