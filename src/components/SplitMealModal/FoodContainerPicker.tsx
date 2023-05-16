import React, { useEffect, useState } from "react";
import classNames from "classnames";
import toast from "react-hot-toast";

import AutoCompleteInput from "../Input/AutoCompleteInput";
import FoodContainerDatabase from "../../database/FoodContainerDatabase";
import { FoodContainer } from "../../types/FoodContainer";
import FoodContainerOverview from "../FoodContainers/FoodContainerOverview";
import QRScanner from "../QRScanner";

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

  const onSelectSearchResultByQrCode = (code: string) => {
    const foodContainer = defaultResults.find(
      (result) => result.identifier === code
    );
    if (!foodContainer) {
      toast.error("No containers found with given code.");
      return;
    }
    onSelectSearchResult(foodContainer);
  };

  return (
    <div
      className={classNames(
        "grid grid-cols-[1fr_auto] gap-2 items-center",
        className
      )}
    >
      <AutoCompleteInput
        inline
        label={label}
        onSearch={onSearch}
        value={searchString}
        defaultResults={defaultResults}
        onChange={setSearchString}
        className="flex-1"
        resultPanelClassName="col-span-full row-start-2"
        renderResult={(foodContainer) => (
          <FoodContainerOverview
            key={foodContainer.identifier}
            onSelect={() => onSelectSearchResult(foodContainer)}
            foodContainer={foodContainer}
          />
        )}
        onSelectSearchResult={onSelectSearchResult}
      />
      <QRScanner
        onQrCodeDetected={onSelectSearchResultByQrCode}
        modalMessage="Scan container QR Code"
        modalLabel="Scan QR Code"
        className="w-14 self-end h-14"
      />
    </div>
  );
}
