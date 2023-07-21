import {
  FoodAmountTracking,
  FoodAmountTrackingType,
} from "../../../../../types/FoodAmountTracking";
import ContainerTrackingForm from "./ContainerTrackingForm";
import IdenticalIndividualTrackingForm from "./IdenticalIndividualTrackingForm";
import SimpleTrackingForm from "./SimpleTrackingForm";

type Props = {
  tracking: FoodAmountTracking;
  onChange: (tracking: FoodAmountTracking) => void;
  className?: string;
};
export default function FoodTrackingForm({
  className,
  tracking,
  onChange,
}: Props) {
  switch (tracking.type) {
    case FoodAmountTrackingType.Individual:
    case FoodAmountTrackingType.Simple:
      return (
        <SimpleTrackingForm
          tracking={tracking}
          onChange={onChange}
          className={className}
        />
      );
    case FoodAmountTrackingType.Container:
      return (
        <ContainerTrackingForm
          tracking={tracking}
          onChange={onChange}
          className={className}
        />
      );
    case FoodAmountTrackingType.IdenticalIndividual:
      return (
        <IdenticalIndividualTrackingForm
          tracking={tracking}
          onChange={onChange}
          className={className}
        />
      );
    default:
      return null;
  }
}
