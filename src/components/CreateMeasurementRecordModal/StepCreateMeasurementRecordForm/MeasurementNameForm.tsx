import React, { useContext, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { createMeasurementRecordAtom } from '../../../atoms/CreateMeasurementAtom';
import AutoCompleteInput from '../../Input/AutoCompleteInput';
import { progressiveFormContext } from '../../ProgressiveForm/context';
import ObjectUtils from '../../../utils/Object';
import MeasurementDatabase, { MeasurementRecord } from '../../../database/MeasurementDatabase';
import { CreateMeasurementStep } from './types';

export default function MeasurementNameForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [measurementRecord, setMeasurementRecord] = useRecoilState(createMeasurementRecordAtom);
  const { goToStep } = useContext(progressiveFormContext);
  const onSearch = (name: string) => {
    setMeasurementRecord(atom => ObjectUtils.deepUpdate(atom, 'record.name', name));
  }

  const onSelectOption = (measurement: MeasurementRecord) => {
    setMeasurementRecord(atom => ObjectUtils.multiDeepUpdate(
      atom, {
      'record.name': measurement.name,
      'record.unit': measurement.unit
    }));
    goToStep(CreateMeasurementStep.Value);
  };

  return (
    <AutoCompleteInput
      inline
      inputRef={inputRef}
      label="Name"
      value={measurementRecord.record.name}
      onChange={onSearch}
      onSearch={(searchString) => MeasurementDatabase.search(searchString)}
      onSelectSearchResult={onSelectOption}
      renderResult={(record) => (
        <span className="text-xs font-bold" key={record.name}>{record.name}</span>
      )}
    />
  )
}