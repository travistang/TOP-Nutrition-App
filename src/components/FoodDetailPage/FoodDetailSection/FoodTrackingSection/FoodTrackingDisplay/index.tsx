import {
  FoodAmountTracking,
  FoodAmountTrackingType,
} from "../../../../../types/FoodAmountTracking";
import Button, { ButtonStyle } from "../../../../Input/Button";
import SimpleTrackingDisplay from "./SimpleTrackingDisplay";

function FoodTrackingDisplayContent({
  tracking,
}: {
  tracking: FoodAmountTracking;
}) {
  switch (tracking.type) {
    case FoodAmountTrackingType.Individual:
    case FoodAmountTrackingType.Simple:
      return <SimpleTrackingDisplay tracking={tracking} />;
    default:
      return null;
  }
}

type Props = {
  tracking: FoodAmountTracking;
  onEdit: () => void;
};

export default function FoodTrackingDisplay({ tracking, onEdit }: Props) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      <FoodTrackingDisplayContent tracking={tracking} />
      <div className="flex items-center justify-end">
        <Button
          buttonStyle={ButtonStyle.Clear}
          icon="pen"
          text="Edit"
          className="h-6"
          textClassName="text-sm"
          onClick={onEdit}
        />
      </div>
    </div>
  );
}
