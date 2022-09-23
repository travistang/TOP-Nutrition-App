import classNames from 'classnames';
import React, { useContext } from 'react';
import Button, { ButtonStyle } from '../Input/Button';
import { ProgressiveFormConfig, progressiveFormContext } from './context';

type Props = {
  config: ProgressiveFormConfig;
}
export default function ProceedButtonGroup({ config }: Props) {
  const { onSubmit } = config;
  const { step, previousStep, goToStep, nextStep, isLastStep, canProceed, restartOnComplete } = useContext(progressiveFormContext);

  const onSubmitWithRestart = () => {
    onSubmit();
    if (restartOnComplete) {
      goToStep(0);
    }
  }

  return (
    <div className="self-bottom grid grid-cols-6 items-center px-4 py-4">
      {
        step > 0 && (
          <Button
            text="Previous"
            icon="caret-left"
            className='col-start-1 col-span-1 gap-2 items-center'
            buttonStyle={ButtonStyle.Clear}
            onClick={previousStep}
          />
        )
      }
      <Button
        text={isLastStep ? "Submit" : "Next"}
        icon={isLastStep ? "check-circle" : "caret-right"}
        disabled={!canProceed}
        className={classNames(
          'col-start-6 col-span-1 gap-2',
          !isLastStep && "flex-row-reverse",
          !canProceed && 'opacity-0'
        )}
        buttonStyle={ButtonStyle.Clear}
        onClick={isLastStep ? onSubmitWithRestart : nextStep}
      />
    </div>
  )
}