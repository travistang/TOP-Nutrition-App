import React, { useEffect, useState } from "react";
import AutoCompleteInput from "../Input/AutoCompleteInput";
import FoodContainerDatabase from "../../database/FoodContainerDatabase";
import { FoodContainer } from "../../types/FoodContainer";
import FoodContainerOverview from "../FoodContainers/FoodContainerOverview";

type Props = {
  selectedContainerId: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
  label?: string;
};

export default function FoodContainerPicker({
  onSelect,
  className,
  label,
}: Props) {
  const [defaultResults, setDefaultResults] = useState<FoodContainer[]>([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    FoodContainerDatabase.getAll().then(setDefaultResults);
  }, []);
  const onSearch = async (searchString: string) => {
    return defaultResults.filter((result) =>
      result.name.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  const onSelectSearchResult = (container: FoodContainer) => {
    onSelect(container.identifier);
    setSearchString(container.name);
  };

  return (
    <AutoCompleteInput
      inline
      label={label}
      onSearch={onSearch}
      value={searchString}
      defaultResults={defaultResults}
      onChange={setSearchString}
      className={className}
      renderResult={(foodContainer) => (
        <FoodContainerOverview
          key={foodContainer.identifier}
          onSelect={() => onSelectSearchResult(foodContainer)}
          foodContainer={foodContainer}
        />
      )}
      onSelectSearchResult={onSelectSearchResult}
    />
  );
}
