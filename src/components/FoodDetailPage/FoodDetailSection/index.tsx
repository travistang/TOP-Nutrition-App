import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FoodCaloriesSection from "./FoodCaloriesSection";
import ConsumptionDatabase, {
  ConsumptionRecord,
  FoodDetails,
} from "../../../database/ConsumptionDatabase";
import Section from "../../Section";
import ImagePicker from "../../Input/ImagePicker";
import Button, { ButtonStyle } from "../../Input/Button";

type Props = {
  selectedRecord: ConsumptionRecord;
};
export default function FoodDetailSection({ selectedRecord }: Props) {
  const [foodDetails, setFoodDetails] = useState<FoodDetails | undefined>();
  const [modified, setModified] = useState(false);

  useEffect(() => {
    ConsumptionDatabase.getOrCreateFoodDetailByRecord(selectedRecord).then(
      setFoodDetails
    );
  }, [selectedRecord]);

  const onChooseImage = useCallback(
    (image: Blob | null) => {
      if (!foodDetails) return;
      setFoodDetails({ ...foodDetails, image: image ?? undefined });
      setModified(true);
    },
    [foodDetails]
  );

  const onSaveDetails = () => {
    if (!foodDetails) return;
    ConsumptionDatabase.updateFoodDetails(foodDetails)
      .then(() => {
        setModified(false);
        toast.success("Food details updated");
      })
      .catch(() => {
        toast.error("Failed to update food details");
      });
  };

  return (
    <Section label="Food information" className="gap-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex-1">{selectedRecord.name}</h3>
        <ImagePicker
          className="w-16 h-16"
          image={foodDetails?.image ?? null}
          onChange={onChooseImage}
        />
      </div>
      {modified && (
        <div className="flex justify-end">
          <Button
            buttonStyle={ButtonStyle.Block}
            onClick={onSaveDetails}
            icon="save"
            text="Save"
            className="w-16 text-xs h-8"
          />
        </div>
      )}
      <FoodCaloriesSection nutrition={selectedRecord.nutritionPerHundred} />
    </Section>
  );
}
