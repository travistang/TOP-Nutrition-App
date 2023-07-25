import { useState } from "react";
import { defaultContainerFromTracking } from "../../../../../../domain/FoodAmountTracking/containers";
import {
  Container,
  FoodContainerTracking,
} from "../../../../../../types/FoodAmountTracking";
import TextWithUnit from "../../../../../TextWithUnit";
import FoodContainerItemRow from "./FoodContainerItemRow";

type Props = {
  tracking: FoodContainerTracking;
  onCancel: () => void;
  onCreate: (container: Container) => void;
  className?: string;
};
export default function CreateEditContainerForm({
  tracking,
  className,
}: Props) {
  const [containerPlaceholder, setContainerPlaceholder] = useState<Container>(
    defaultContainerFromTracking(tracking)
  );

  const onAmountChange = (amount: number) => {
    setContainerPlaceholder({
      ...containerPlaceholder,
      amount,
    });
  };

  const isEditing = !!containerPlaceholder;
  return (
    <FoodContainerItemRow className={className}>
      <div className="flex items-center flex-1">
        <div className="flex flex-col items-stretch flex-1 gap-2">
          <TextWithUnit
            value={containerPlaceholder.amount}
            unit="g"
            size="lg"
          />
          <input
            onChange={(e) => onAmountChange(e.target.valueAsNumber)}
            value={containerPlaceholder.amount}
            type="range"
            min={0}
            max={tracking.containerCapacity}
            className="h-2 w-full"
            step={10}
          />
        </div>
      </div>
    </FoodContainerItemRow>
  );
}
