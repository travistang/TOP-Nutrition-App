import classNames from "classnames";
import React, { useState } from "react";
import ProceedButtonGroup from "./ProceedButtonGroup";
import StepList from "../StepList";
import {
  ProgressiveFormConfig,
  progressiveFormContext,
} from "./context";
import { prepareContextValue } from "./formLogic";

type Props = {
  config: ProgressiveFormConfig;
  className?: string;
  children?: React.ReactNode;
  initialStep?: number;
};
export default function ProgressiveForm({
  config,
  className,
  children,
  initialStep
}: Props) {
  const [step, setStep] = useState(initialStep ?? 0);
  const [restartOnComplete, setRestartOnComplete] = useState(false);
  const contextValue = prepareContextValue({
    config,
    step, setStep,
    restartOnComplete, setRestartOnComplete
  });
  const StepComponent = config.steps[step].formComponent;
  return (
    <progressiveFormContext.Provider value={contextValue}>
      <div className={classNames("flex flex-col items-stretch", className)}>
        <StepList
          currentStep={step}
          className="pb-4 sticky top-6 bg-gray-200 z-20"
          stepIcons={config.steps.map((conf) => conf.icon)}
        />
        {children}
        <StepComponent />
        <div className="flex-1 min-h-[16px]" />
        <ProceedButtonGroup config={config} />
      </div>
    </progressiveFormContext.Provider>
  );
}
