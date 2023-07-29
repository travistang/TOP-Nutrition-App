import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import FoodSearchPanel from "../components/FoodDetailPage/FoodSearchPanel";
import FoodSearchResult from "../components/FoodDetailPage/FoodSearchResult";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import consumptionDatabase, {
  FoodDetails,
} from "../database/ConsumptionDatabase";

export default function FoodDetailPage() {
  const [selectedFoodDetails, setSelectedFoodDetails] =
    useState<FoodDetails | null>(null);

  const realtimeFoodDetails = useLiveQuery(() => {
    if (!selectedFoodDetails) return undefined;
    return consumptionDatabase.foodDetails.get(selectedFoodDetails.id);
  }, [selectedFoodDetails]);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-48 scroll-pb-12">
      <StatisticsNavigateTab />
      <FoodSearchPanel
        onRecordSelected={setSelectedFoodDetails}
        onClear={() => setSelectedFoodDetails(null)}
      />
      {realtimeFoodDetails && (
        <FoodSearchResult selectedDetails={realtimeFoodDetails} />
      )}
    </div>
  );
}
