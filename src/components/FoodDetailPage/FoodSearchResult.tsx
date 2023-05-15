import React, { useEffect, useState } from "react";
import { ConsumptionRecord } from "../../database/ConsumptionDatabase";
import FoodDetailSection from "./FoodDetailSection";
import FoodConsumptionHistory from "./FoodConsumptionHistory";
import ConsumptionDatabase from "../../database/ConsumptionDatabase";
import RecentConsumptionList from "./RecentConsumptionList";

type Props = {
  selectedRecord: ConsumptionRecord;
};
export default function FoodSearchResult({ selectedRecord }: Props) {
  const [lookupDate, setLookupDate] = useState(new Date());
  const [recentRecords, setRecentRecords] = useState<ConsumptionRecord[]>([]);
  useEffect(() => {
    if (!selectedRecord) {
      setRecentRecords([]);
      return;
    }
    ConsumptionDatabase.findRecordsWithSameFood(
      selectedRecord,
      lookupDate.getTime()
    ).then((similarRecords) => setRecentRecords(similarRecords ?? []));
  }, [selectedRecord, lookupDate]);

  return (
    <>
      <FoodDetailSection selectedRecord={selectedRecord} />
      <FoodConsumptionHistory
        records={recentRecords}
        date={lookupDate}
        onChangeDate={setLookupDate}
      />
      <RecentConsumptionList records={recentRecords} />
    </>
  );
}