import classNames from "classnames";
import React, { useState } from "react";
import ProceedButtonGroup from "./ProceedButtonGroup";
import StepList from "../StepList";
import {
  ProgressiveFormConfig,
  progressiveFormContext,
  ProgressiveFormContextValue,
} from "./context";

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
  const {
    steps: stepsConfig,
    nextStep: nextStepCallback,
    previousStep: previousStepCallback,
  } = config;
  const goToStep = (index: number) => {
    if (0 <= index && index <= stepsConfig.length - 1) {
      setStep(index);
    }
  };

  const getStepTicker =
    (offset: number, callback?: (step: number) => number | null) => () => {
      const stepsFromCallback = callback?.(step);
      if (stepsFromCallback !== undefined && stepsFromCallback !== null) {
        goToStep(stepsFromCallback);
        return;
      }
      goToStep(step + offset);
    };

  const nextStep = getStepTicker(1, nextStepCallback);
  const previousStep = getStepTicker(-1, previousStepCallback);
  const isLastStep = step >= config.steps.length - 1;
  const canProceed =
    isLastStep || (nextStepCallback ? nextStepCallback(step) !== null : true);
  const canReturn =
    step > 0 &&
    (previousStepCallback ? previousStepCallback(step) !== null : true);

  const toggleRestartOnComplete = () =>
    setRestartOnComplete(!restartOnComplete);

  const contextValue: ProgressiveFormContextValue = {
    steps: config.steps,
    step,
    restartOnComplete,
    toggleRestartOnComplete,
    goToStep,
    nextStep,
    previousStep,
    canProceed,
    isLastStep,
    canReturn,
  };

  const StepComponent = config.steps[step].formComponent;
  return (
    <progressiveFormContext.Provider value={contextValue}>
      <div className={classNames("flex flex-col items-stretch", className)}>
        <StepList
          currentStep={step}
          className="pb-4"
          stepIcons={stepsConfig.map((conf) => conf.icon)}
        />
        {children}
        <StepComponent />
        <div className="flex-1 min-h-[16px]" />
        <ProceedButtonGroup config={config} />
      </div>
    </progressiveFormContext.Provider>
  );
}
