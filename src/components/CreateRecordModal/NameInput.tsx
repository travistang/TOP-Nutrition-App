import React from "react";
import { useSetRecoilState } from "recoil";
import { createEditRecordAtom } from "../../atoms/CreateEditRecordAtom";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../database/ConsumptionDatabase";
import { Consumption } from "../../types/Consumption";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ConsumptionAutocompleteResult from "../Input/ConsumptionAutocompleteResult";

type Props = {
  onChange: (s: string) => void;
  consumption: Consumption & Partial<ConsumptionRecord>;
};
export default function NameInput({ onChange, consumption }: Props) {
  const setCreateEditRecord = useSetRecoilState(createEditRecordAtom);
  const useAutoCompleteResult = ({
    id: _,
    date: __,
    amount: ___,
    ...usingRecord
  }: ConsumptionRecord) => {
    setCreateEditRecord((atom) => {
      const updatedRecord = { ...atom.record, ...usingRecord };
      return { ...atom, record: updatedRecord };
    });
  };

  return (
    <AutoCompleteInput
      label="Name"
      value={consumption.name}
      onChange={onChange}
      className="col-span-4"
      onSearch={ConsumptionDatabase.search.bind(ConsumptionDatabase)}
      onSelectSearchResult={useAutoCompleteResult}
      renderResult={(record) => (
        <ConsumptionAutocompleteResult record={record} key={record.id} />
      )}
    />
  );
}
