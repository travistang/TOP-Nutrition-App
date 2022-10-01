import React, { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom, ModalOpenSource } from '../../../atoms/CreateEditRecordAtom';
import CheckboxInput from '../../Input/CheckboxInput';
import { progressiveFormContext } from '../../ProgressiveForm/context';
import ProgressiveTimeForm from '../../ProgressiveForm/TimeForm';
import SmallNotice from '../../SmallNotice';

export default function TimeForm() {
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(createEditRecordAtom);
  const { toggleRestartOnComplete, restartOnComplete } = useContext(progressiveFormContext);
  const { record: { id, date }, openingSource } = consumptionRecord;
  const isEditing = !!id;
  const setDate = (date: Date) => {
    setConsumptionRecord(atom => ({
      ...atom,
      record: { ...atom.record, date: date.getTime() },
    }));
  };

  return (
    <ProgressiveTimeForm
      title="Consumption time"
      date={new Date(date)}
      setDate={setDate}
      useCurrentTimeByDefault={openingSource === ModalOpenSource.Cta}>
      {!isEditing ? (
        <CheckboxInput
          className="pt-4"
          onCheck={toggleRestartOnComplete}
          selected={restartOnComplete}
          label="Add another record"
        />
      ) : (
        <SmallNotice icon="info-circle">
          You are updating an existing record
        </SmallNotice>
      )}
    </ProgressiveTimeForm>
  );
}