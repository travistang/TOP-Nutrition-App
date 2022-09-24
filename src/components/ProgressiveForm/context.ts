import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type ProgressiveFormStep = {
  icon: IconProp;
  formComponent: React.FC;
  key: string;
};

export type ProgressiveFormContextValue = {
  step: number;
  steps: ProgressiveFormStep[];
  restartOnComplete: boolean;
  toggleRestartOnComplete: () => void;
  isLastStep: boolean;
  canProceed: boolean;
  canReturn: boolean;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
};

export type ProgressiveFormConfig = {
  steps: ProgressiveFormStep[];
  nextStep?: (currentStep: number) => number | null;
  previousStep?: (currentStep: number) => number | null;
  onSubmit: (contextState: ProgressiveFormContextValue) => void;
};

export const progressiveFormContext =
  React.createContext<ProgressiveFormContextValue>({
    step: 0,
    steps: [],
    restartOnComplete: false,
    toggleRestartOnComplete: () => {},
    isLastStep: true,
    canProceed: false,
    canReturn: false,
    nextStep: () => {},
    previousStep: () => {},
    goToStep: () => {},
  });
