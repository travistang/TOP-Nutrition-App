import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import ConsumptionDatabase, {
  ConsumptionRecord,
} from "../../../database/ConsumptionDatabase";
import ImagePicker from "../../Input/ImagePicker";
import Section from "../../Section";
import FoodCaloriesSection from "./FoodCaloriesSection";
import FoodTrackingSection from "./FoodTrackingSection";

type Props = {
  selectedRecord: ConsumptionRecord;
};
export default function FoodDetailSection({ selectedRecord }: Props) {
  const foodDetails = useLiveQuery(() => {
    return ConsumptionDatabase.getOrCreateFoodDetailByRecord(selectedRecord);
  }, [selectedRecord]);

  const onChooseImage = useCallback(
    (image: Blob | null) => {
      if (!foodDetails) return;
      const newFoodDetails = { ...foodDetails, image: image ?? undefined };
      ConsumptionDatabase.updateFoodDetails(newFoodDetails)
        .then(() => {
          toast.success("Food details updated");
        })
        .catch(() => {
          toast.error("Failed to update food details");
        });
    },
    [foodDetails]
  );

  return (
    <>
      <Section label="Food information" className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex-1">{selectedRecord.name}</h3>
          <ImagePicker
            className="w-16 h-16"
            image={foodDetails?.image ?? null}
            onChange={onChooseImage}
          />
        </div>
        <FoodCaloriesSection nutrition={selectedRecord.nutritionPerHundred} />
      </Section>
      {foodDetails && <FoodTrackingSection foodDetails={foodDetails} />}
    </>
  );
}
