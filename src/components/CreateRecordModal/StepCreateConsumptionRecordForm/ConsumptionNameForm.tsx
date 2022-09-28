import React, { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { createEditRecordAtom } from '../../../atoms/CreateEditRecordAtom';
import ConsumptionDatabase, { ConsumptionRecord } from '../../../database/ConsumptionDatabase';
import AutoCompleteInput from '../../Input/AutoCompleteInput';
import ConsumptionAutocompleteResult from '../../Input/ConsumptionAutocompleteResult';
import { progressiveFormContext } from '../../ProgressiveForm/context';
import { CreateConsumptionStep } from './types';

export default function ConsumptionNameForm() {
  const [consumptionRecord, setConsumptionRecord] = useRecoilState(createEditRecordAtom);
  const { goToStep } = useContext(progressiveFormContext);
  const onSearchName = (name: string) => {
    setConsumptionRecord((atom) => ({
      ...atom,
      record: { ...atom.record, name },
    }));
  };

  const onSelectItem = (item: ConsumptionRecord) => {
    setConsumptionRecord((atom) => {
      const updatedRecord = { ...atom.record, ...item };
      return { ...atom, record: updatedRecord };
    });
    goToStep(CreateConsumptionStep.Amount);
  }

  return (
    <AutoCompleteInput
      label="Name"
      value={consumptionRecord.record.name}
      onChange={onSearchName}
      onSearch={ConsumptionDatabase.search.bind(ConsumptionDatabase)}
      onSelectSearchResult={onSelectItem}
      renderResult={(record) => (
        <ConsumptionAutocompleteResult record={record} key={record.id} />
      )}
    />
  )
}