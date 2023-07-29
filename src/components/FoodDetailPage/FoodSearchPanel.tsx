import { useCallback, useState } from "react";
import ConsumptionDatabase, {
  FoodDetails,
} from "../../database/ConsumptionDatabase";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import ConsumptionAutocompleteResult from "../Input/ConsumptionAutocompleteResult";

type Props = {
  onClear: () => void;
  onRecordSelected: (record: FoodDetails) => void;
};
export default function FoodSearchPanel({ onClear, onRecordSelected }: Props) {
  const [searchString, setSearchString] = useState("");
  const selectRecordWithSetString = useCallback(
    (details: FoodDetails) => {
      setSearchString(details.name);
      onRecordSelected(details);
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
        onSearch={ConsumptionDatabase.searchFoodDetails.bind(
          ConsumptionDatabase
        )}
        onSelectSearchResult={selectRecordWithSetString}
        renderResult={(record: FoodDetails) => (
          <ConsumptionAutocompleteResult record={record} key={record.id} />
        )}
      />
    </div>
  );
}
