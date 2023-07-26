import { useState } from "react";
import { defaultContainerFromTracking } from "../../../../../../domain/FoodAmountTracking/containers";
import {
  Container,
  FoodContainerTracking,
  StorageCondition,
} from "../../../../../../types/FoodAmountTracking";
import TextWithUnit from "../../../../../TextWithUnit";
import FoodContainerItemRow from "./FoodContainerItemRow";
import TickerInput from "../../../../../Input/TickerInput";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import StorageConditionToggle from "./StorageConditionToggle";
import FoodContainerExpiryDateInput from "./FoodContainerExpiryDateInput";

type Props = {
  tracking: FoodContainerTracking;
  onCancel: () => void;
  onCreate: (container: Container) => void;
  className?: string;
};
export default function CreateEditContainerForm({
  tracking,
  className,
  onCancel,
  onCreate,
}: Props) {
  const [containerPlaceholder, setContainerPlaceholder] = useState<Container>(
    defaultContainerFromTracking(tracking)
  );
  const [numContainers, setNumContainers] = useState(1);

  const { id, amount, expiryDate, storageCondition, cooked } =
    containerPlaceholder;

  const onAmountChange = (amount: number) => {
    setContainerPlaceholder({
      ...containerPlaceholder,
      amount,
    });
  };

  const isEditing = !!id;

  const saveContainerInfo = () => {
    onCreate(containerPlaceholder);
  };

  const setExpiryDate = (expiryDate?: number) => {
    setContainerPlaceholder({
      ...containerPlaceholder,
      expiryDate,
    });
  };

  const onStorageToggleChange = (storageCondition?: StorageCondition) => {
    setContainerPlaceholder({
      ...containerPlaceholder,
      storageCondition,
    });
  };

  return (
    <FoodContainerItemRow className={className}>
      <div className="flex-1 grid items-center grid-cols-[auto_repeat(4,1fr)_auto] grid-rows-[auto_auto_1fr_auto] gap-2">
        {!isEditing && (
          <TickerInput
            min={1}
            value={numContainers}
            onChange={setNumContainers}
            className="row-span-2 col-start-1 w-22"
            buttonClassName="w-6"
            formatter={({ value }) => (
              <span className="font-bold text-xs flex items-center overflow-hidden whitespace-nowrap">
                x {value}
              </span>
            )}
          />
        )}
        <div className="flex items-center gap-2 col-start-2 col-span-5 row-start-1 flex-wrap">
          <span className="text-xs">Amount:</span>
          <TextWithUnit
            value={amount}
            unit="g"
            size="lg"
            className="col-start-2 col-span-5 row-start-1"
          />
        </div>
        <input
          onChange={(e) => onAmountChange(e.target.valueAsNumber)}
          value={amount}
          type="range"
          min={0}
          max={tracking.containerCapacity}
          className="h-2 w-full row-start-2 col-start-2 col-span-5"
          step={5}
        />
        <div className="col-start-6 row-span-2 row-start-4 flex items-center gap-2">
          <Button
            onClick={onCancel}
            buttonStyle={ButtonStyle.Clear}
            icon="times"
            className="flex-1 h-8"
          />
          <Button
            onClick={saveContainerInfo}
            icon="check"
            className="flex-1 h-8"
          />
        </div>
        <StorageConditionToggle
          className="col-start-1 col-span-3 row-start-4"
          storageCondition={storageCondition}
          onToggle={onStorageToggleChange}
        />
        <FoodContainerExpiryDateInput
          onChange={setExpiryDate}
          expiryDate={expiryDate}
        />
      </div>
    </FoodContainerItemRow>
  );
}
