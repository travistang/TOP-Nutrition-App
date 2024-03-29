import { useState } from "react";
import {
  Container,
  StorageCondition,
} from "../../../../../../types/FoodAmountTracking";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import CheckboxInput from "../../../../../Input/CheckboxInput";
import TickerInput from "../../../../../Input/TickerInput";
import TextWithUnit from "../../../../../TextWithUnit";
import FoodContainerExpiryDateInput from "./FoodContainerExpiryDateInput";
import FoodContainerItemRow from "./FoodContainerItemRow";
import StorageConditionToggle from "./StorageConditionToggle";

type Props = {
  container: Container;
  onCancel: () => void;
  onDelete?: () => void;
  onCreate: (container: Container, numContainers: number) => Promise<void>;
  className?: string;
};
export default function CreateEditContainerForm({
  className,
  container,
  onCancel,
  onDelete,
  onCreate,
}: Props) {
  const [numContainers, setNumContainers] = useState(1);
  const [containerPlaceholder, setContainerPlaceholder] =
    useState<Container>(container);

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
    onCreate(containerPlaceholder, numContainers);
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
            className="row-start-1 row-span-2 col-start-1 w-22"
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
          max={container.capacity}
          className="h-2 w-full row-start-2 col-start-2 col-span-5"
          step={5}
        />
        <CheckboxInput
          selected={!!cooked}
          label="Cooked"
          className="row-start-3 col-start-1 col-span-3"
          onCheck={() =>
            setContainerPlaceholder({
              ...containerPlaceholder,
              cooked: !cooked,
            })
          }
        />
        <FoodContainerExpiryDateInput
          className="row-start-3 col-start-4 col-span-3"
          onChange={setExpiryDate}
          expiryDate={expiryDate}
        />
        <StorageConditionToggle
          className="col-start-1 col-span-4 row-start-4"
          storageCondition={storageCondition}
          onToggle={onStorageToggleChange}
        />
        <div className="col-start-6 row-start-4 flex items-center gap-2">
          {onDelete && (
            <Button
              onClick={onDelete}
              buttonStyle={ButtonStyle.Clear}
              icon="trash"
              textClassName="text-red child:fill-red-500"
              className="flex-1 h-8"
            />
          )}
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
      </div>
    </FoodContainerItemRow>
  );
}
