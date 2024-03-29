import classNames from "classnames";
import React, { useContext } from "react";
import Button, { ButtonStyle, Props as ButtonProps } from "../Input/Button";
import { ProgressiveFormConfig, progressiveFormContext } from "./context";

type Props = {
  config: ProgressiveFormConfig;
};

const nextButtonConfig: Partial<ButtonProps> = {
  text: "Next",
  icon: "caret-right",
};

const lastStepButtonConfig: Partial<ButtonProps> = {
  text: "Submit",
  icon: "check-circle",
};

export default function ProceedButtonGroup({ config }: Props) {
  const { onSubmit, onRestart } = config;
  const formContextValue = useContext(progressiveFormContext);
  const {
    step,
    previousStep,
    goToStep,
    nextStep,
    isLastStep,
    canProceed,
    restartOnComplete,
    toggleRestartOnComplete,
  } = formContextValue;

  const onSubmitWithRestart = () => {
    onSubmit(formContextValue);
    if (restartOnComplete) {
      goToStep(0);
      toggleRestartOnComplete();
      onRestart?.();
    }
  };

  return (
    <div className="grid grid-cols-6 items-center px-4 py-4 sticky -bottom-2 bg-gray-200">
      {step > 0 && (
        <Button
          text="Previous"
          icon="caret-left"
          className="col-start-1 col-span-1 gap-2 items-center"
          buttonStyle={ButtonStyle.Clear}
          onClick={previousStep}
        />
      )}
      <Button
        disabled={!canProceed}
        className={classNames(
          "col-start-6 col-span-1 gap-2",
          !canProceed ? "hidden" : "flex-row-reverse"
        )}
        buttonStyle={ButtonStyle.Clear}
        onClick={isLastStep ? onSubmitWithRestart : nextStep}
        {...(isLastStep ? lastStepButtonConfig : nextButtonConfig)}
      />
    </div>
  );
}
