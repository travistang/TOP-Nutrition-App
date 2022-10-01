import { ProgressiveFormConfig, ProgressiveFormContextValue } from "./context";

export type ContextValueComputeParams = {
  step: number;
  config: ProgressiveFormConfig;
  setStep: (step: number) => void;
  setRestartOnComplete: (shouldRestart: boolean) => void;
  restartOnComplete: boolean;
};
export const prepareContextValue = ({
  step,
  config,
  setStep,
  setRestartOnComplete,
  restartOnComplete,
}: ContextValueComputeParams): ProgressiveFormContextValue => {
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
      goToStep(callback?.(step) ?? step + offset);
    };

  const isLastStep = step >= config.steps.length - 1;
  const canProceed =
    isLastStep || (nextStepCallback ? nextStepCallback(step) !== null : true);
  const canReturn =
    step > 0 &&
    (previousStepCallback ? previousStepCallback(step) !== null : true);

  const toggleRestartOnComplete = () =>
    setRestartOnComplete(!restartOnComplete);

  return {
    steps: config.steps,
    step,
    restartOnComplete,
    toggleRestartOnComplete,
    goToStep,
    nextStep: getStepTicker(1, nextStepCallback),
    previousStep: getStepTicker(-1, previousStepCallback),
    canProceed,
    isLastStep,
    canReturn,
  };
};