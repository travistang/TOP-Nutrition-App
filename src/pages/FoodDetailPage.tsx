import { useCallback, useState } from "react";
import FoodSearchPanel from "../components/FoodDetailPage/FoodSearchPanel";
import FoodSearchResult from "../components/FoodDetailPage/FoodSearchResult";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import { ConsumptionRecord } from "../database/ConsumptionDatabase";

export default function FoodDetailPage() {
  const [selectedRecord, setSelectedRecord] =
    useState<ConsumptionRecord | null>(null);

  const clearRecord = useCallback(() => setSelectedRecord(null), []);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-48 scroll-pb-12">
      <StatisticsNavigateTab />
      <FoodSearchPanel
        onRecordSelected={setSelectedRecord}
        onClear={clearRecord}
      />
      {selectedRecord && <FoodSearchResult selectedRecord={selectedRecord} />}
    </div>
  );
}
