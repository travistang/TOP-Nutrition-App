import { FoodDetails } from "../../../../database/ConsumptionDatabase";
import Section from "../../../Section";
import SetupFoodTrackingEntry from "./SetupFoodTrackingEntry";

type Props = {
  foodDetails: FoodDetails;
};

export default function FoodTrackingSection({ foodDetails }: Props) {
  return (
    <Section label="Amount tracking">
      WIP
      {!foodDetails.amountTracking && <SetupFoodTrackingEntry />}
    </Section>
  );
}
