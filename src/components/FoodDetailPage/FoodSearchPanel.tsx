import React, { useCallback, useState } from "react";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import ConsumptionAutocompleteResult from "../Input/ConsumptionAutocompleteResult";

type Props = {
  onClear: () => void;
  onRecordSelected: (record: ConsumptionRecord) => void;
};
export default function FoodSearchPanel({ onClear, onRecordSelected }: Props) {
  const [searchString, setSearchString] = useState("");
  const selectRecordWithSetString = useCallback(
    (record: ConsumptionRecord) => {
      setSearchString(record.name);
      onRecordSelected(record);
    },
    [onRecordSelected]
  );

  const onChange = useCallback(
    (search: string) => {
      if (!search) {
        onClear();
      }
      setSearchString(search);
    },
    [onClear]
  );

  return (
    <div className="flex flex-col items-stretch">
      <AutoCompleteInput
        inline
        placeholder="Search for food.."
        icon="search"
        value={searchString}
        onChange={onChange}
        onSearch={ConsumptionDatabase.search.bind(ConsumptionDatabase)}
        onSelectSearchResult={selectRecordWithSetString}
        renderResult={(record) => (
          <ConsumptionAutocompleteResult record={record} key={record.id} />
        )}
      />
    </div>
  );
}
