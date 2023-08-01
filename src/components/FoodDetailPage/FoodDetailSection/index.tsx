import { useCallback } from "react";
import { toast } from "react-hot-toast";
import ConsumptionDatabase, {
  FoodDetails,
} from "../../../database/ConsumptionDatabase";
import ImagePicker from "../../Input/ImagePicker";
import Section from "../../Section";
import FoodCaloriesSection from "./FoodCaloriesSection";
import FoodTrackingSection from "./FoodTrackingSection";

type Props = {
  details: FoodDetails;
};
export default function FoodDetailSection({ details }: Props) {
  const onChooseImage = useCallback(
    (image: Blob | null) => {
      ConsumptionDatabase.updateFoodDetails(details.id, {
        image: image ?? undefined,
      })
        .then(() => {
          toast.success("Food details updated");
        })
        .catch(() => {
          toast.error("Failed to update food details");
        });
    },
    [details]
  );

  return (
    <>
      <Section label="Food information" className="gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex-1">{details.name}</h3>
          <ImagePicker
            className="w-16 h-16"
            image={details?.image ?? null}
            onChange={onChooseImage}
          />
        </div>
        <FoodCaloriesSection nutrition={details.nutritionPerHundred} />
      </Section>
      <FoodTrackingSection foodDetails={details} />
    </>
  );
}
