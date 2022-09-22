import React from 'react';
import classNames from 'classnames';
import Button, { ButtonStyle } from '../../Input/Button';
import { CreateExerciseStep } from './types';

type Props = {
  step: CreateExerciseStep;
  isLastStep: boolean;
  canProceed: boolean;
  setStep: (step: CreateExerciseStep) => void;
  onSubmit: () => void;
}
export default function ProceedButtonGroup({ setStep, step, isLastStep, canProceed, onSubmit }: Props) {
  const toNextStep = () => {
    const nextStep = step + 1;
    if (nextStep <= CreateExerciseStep.Time) {
      setStep(nextStep);
    }
  };

  const toPreviousStep = () => {
    const previousStep = step - 1;
    if (previousStep >= CreateExerciseStep.Name) {
      setStep(previousStep);
    }
  };
  return (
    <div className="self-bottom grid grid-cols-6 items-center px-4 py-4">
      {
        step > 0 && (
          <Button
            text="Previous"
            icon="caret-left"
            className='col-start-1 col-span-1 gap-2 items-center'
            buttonStyle={ButtonStyle.Clear}
            onClick={toPreviousStep}
          />
        )
      }
      <Button
        text={isLastStep ? "Record" : "Next"}
        icon={isLastStep ? "check-circle" : "caret-right"}
        disabled={!canProceed}
        className={classNames(
          'col-start-6 col-span-1 gap-2',
          !isLastStep && "flex-row-reverse",
          !canProceed && 'opacity-0'
        )}
        buttonStyle={ButtonStyle.Clear}
        onClick={isLastStep ? onSubmit : toNextStep}
      />
    </div>
  )
}