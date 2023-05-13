import React, { useCallback, useEffect, useState } from "react";
import StatisticsNavigateTab from "../components/StatisticsNavigateTab";
import FoodSearchPanel from "../components/FoodDetailPage/FoodSearchPanel";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../database/ConsumptionDatabase";
import FoodDetailSection from "../components/FoodDetailPage/FoodDetailSection";

export default function FoodDetailPage() {
  const [selectedRecord, setSelectedRecord] =
    useState<ConsumptionRecord | null>(null);
  const [recentRecords, setRecentRecords] = useState<ConsumptionRecord[]>([]);

  useEffect(() => {
    if (!selectedRecord) {
      setRecentRecords([]);
      return;
    }
    ConsumptionDatabase.findRecordsWithSameFood(selectedRecord).then(
      (similarRecords) => setRecentRecords(similarRecords ?? [])
    );
  }, [selectedRecord]);

  const clearRecord = useCallback(() => setSelectedRecord(null), []);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden flex-1 items-stretch gap-2 pb-12">
      <StatisticsNavigateTab />
      <FoodSearchPanel
        onRecordSelected={setSelectedRecord}
        onClear={clearRecord}
      />
      {recentRecords.length > 0 && (
        <FoodDetailSection records={recentRecords} />
      )}
    </div>
  );
}
