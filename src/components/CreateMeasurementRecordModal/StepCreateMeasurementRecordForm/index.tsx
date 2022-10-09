import React from 'react';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import MeasurementDatabase from '../../../database/MeasurementDatabase';
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
      await MeasurementDatabase.add(record);
      toast.success("Measurement added");
      closeModal();
    } catch (e) {
      toast.error("Failed to record measurement");
    }
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