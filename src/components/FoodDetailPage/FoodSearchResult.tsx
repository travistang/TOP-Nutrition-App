import { useEffect, useState } from "react";
import ConsumptionDatabase, {
  ConsumptionRecord,
  FoodDetails,
} from "../../database/ConsumptionDatabase";
import FoodConsumptionHistory from "./FoodConsumptionHistory";
import FoodDetailContextProvider from "./FoodDetailContext";
import FoodDetailSection from "./FoodDetailSection";
import RecentConsumptionList from "./RecentConsumptionList";

type Props = {
  selectedDetails: FoodDetails;
};
export default function FoodSearchResult({ selectedDetails }: Props) {
  const [lookupDate, setLookupDate] = useState(new Date());
  const [recentRecords, setRecentRecords] = useState<ConsumptionRecord[]>([]);
  useEffect(() => {
    if (!selectedDetails) {
      setRecentRecords([]);
      return;
    }
    ConsumptionDatabase.findRecordsByDetails(
      selectedDetails,
      lookupDate.getTime()
    ).then((similarRecords) => setRecentRecords(similarRecords ?? []));
  }, [selectedDetails, lookupDate]);

  return (
    <FoodDetailContextProvider foodDetails={selectedDetails}>
      <FoodDetailSection details={selectedDetails} />
      <FoodConsumptionHistory
        records={recentRecords}
        date={lookupDate}
        onChangeDate={setLookupDate}
      />
      <RecentConsumptionList records={recentRecords} />
    </FoodDetailContextProvider>
  );
}
