import React from 'react';
import { useRecoilState } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import MeasurementDomain from '../../../domain/Measurement';
import { DEFAULT_MEASUREMENT } from '../../../types/Measurement';
import ProgressiveForm from '../../ProgressiveForm';
import { ProgressiveFormConfig } from '../../ProgressiveForm/context';
import MeasurementPreview from './MeasurementPreview';
import { getNextStep, steps } from './stepConfig';

export default function StepCreateMeasurementRecordForm() {
  const [{ record }, setMeasurementRecord] = useRecoilState(createMeasurementRecordAtom);
  const closeModal = () => setMeasurementRecord({
    record: DEFAULT_MEASUREMENT,
    modalOpened: false
  });
  const onSubmit = async () => {
    try {
      await MeasurementDomain.createEditRecord(record)
      closeModal();
    } catch {}
  };

  const config: ProgressiveFormConfig = {
    steps,
    onSubmit,
    nextStep: (step) => getNextStep(step, record),
  };

  return (
    <ProgressiveForm config={config}>
      <MeasurementPreview measurement={record} />
    </ProgressiveForm>
  )
}