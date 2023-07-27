import { useState } from "react";
import toast from "react-hot-toast";
import consumptionDatabase, {
  FoodDetails,
} from "../../../../database/ConsumptionDatabase";
import { FoodAmountTracking } from "../../../../types/FoodAmountTracking";
import EmptyNotice from "../../../EmptyNotice";
import Section from "../../../Section";
import FoodDetailContextProvider from "../FoodDetailContext";
import FoodTrackingDisplay from "./FoodTrackingDisplay";
import FoodTrackingSetupModal from "./FoodTrackingSetupModal";

type Props = {
  foodDetails: FoodDetails;
};

export default function FoodTrackingSection({ foodDetails }: Props) {
  const [showFoodTrackingSetupModal, setShowFoodTrackingSetupModal] =
    useState(false);
  const updateTracking = async (newTracking: FoodAmountTracking) => {
    try {
      await consumptionDatabase.updateFoodDetails({
        id: foodDetails.id,
        amountTracking: newTracking,
      });
      toast.success("Tracking settings updated");
      return true;
    } catch (e) {
      toast.error("Failed to update tracking settings");
      return false;
    }
  };

  const showModal = () => setShowFoodTrackingSetupModal(true);
  return (
    <FoodDetailContextProvider foodDetails={foodDetails}>
      <Section label="Amount tracking">
        {!foodDetails.amountTracking ? (
          <EmptyNotice
            onClick={showModal}
            message="No amount tracking set for this food. Click to setup"
          />
        ) : (
          <FoodTrackingDisplay
            onEdit={showModal}
            tracking={foodDetails.amountTracking}
          />
        )}
        <FoodTrackingSetupModal
          tracking={foodDetails.amountTracking}
          opened={showFoodTrackingSetupModal}
          onClose={() => setShowFoodTrackingSetupModal(false)}
          onUpdate={updateTracking}
        />
      </Section>
    </FoodDetailContextProvider>
  );
}
