import React, { useEffect, useRef } from 'react';
import ConsumptionDatabase, { ConsumptionRecord } from '../../../database/ConsumptionDatabase';
import AutoCompleteInput from '../../Input/AutoCompleteInput';
import ConsumptionAutocompleteResult from '../../Input/ConsumptionAutocompleteResult';


type Props = {
  onInputChange: (name: string) => void;
  onSelectRecord: (record: ConsumptionRecord) => void;
  name: string;
}
export default function FoodNameForm({ name, onInputChange, onSelectRecord}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => inputRef?.current?.focus(), []);

  return (
    <AutoCompleteInput
      inline
      inputRef={inputRef}
      label="Name"
      value={name}
      onChange={onInputChange}
      onSearch={ConsumptionDatabase.search.bind(ConsumptionDatabase)}
      onSelectSearchResult={onSelectRecord}
      renderResult={(record) => (
        <ConsumptionAutocompleteResult record={record} key={record.id} />
      )}
    />
  );
}