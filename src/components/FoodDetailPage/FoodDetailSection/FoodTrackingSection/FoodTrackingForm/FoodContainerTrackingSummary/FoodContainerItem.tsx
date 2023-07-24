import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {
  StorageConditionIcon,
  UsageColorMap,
  computeContainerUsage,
} from "../../../../../../domain/FoodAmountTracking/containers";
import { Container } from "../../../../../../types/FoodAmountTracking";
import Button, { ButtonStyle } from "../../../../../Input/Button";
import ProgressBar from "../../../../../ProgressBar";
import TextWithUnit from "../../../../../TextWithUnit";
import FoodContainerItemRow from "./FoodContainerItemRow";

type Props = {
  className?: string;
  container: Container;
  multiple?: number;
  onEdit: () => void;
};

const progressBarOptions = (container: Container) => {
  const usage = computeContainerUsage(container);
  return [
    {
      name: "amount",
      value: container.amount,
      color: UsageColorMap[usage],
    },
  ];
};
export default function FoodContainerItem({
  container,
  className,
  onEdit,
  multiple,
}: Props) {
  const { amount, capacity, expiryDate, storageCondition } = container;
  return (
    <FoodContainerItemRow className={className}>
      <div className="w-8">
        {storageCondition && (
          <FontAwesomeIcon
            icon={StorageConditionIcon[storageCondition]}
            className="w-8 h-8 child:fill-gray-800"
          />
        )}
      </div>
      {!!multiple && (
        <span className="font-bold text-2 px-2">x {multiple}</span>
      )}
      <div className="flex-1 flex flex-col items-stretch gap-1">
        <TextWithUnit className="text-xl" value={amount} unit="g" size="lg" />
        <ProgressBar
          className="w-full h-2"
          totalValue={capacity}
          data={progressBarOptions(container)}
        />
      </div>
      <span className="flex gap-1 items-center w-20 px-1">
        <FontAwesomeIcon icon="calendar" />
        {expiryDate ? format(expiryDate, "dd/MM") : "--"}
      </span>
      <Button
        className="w-20"
        buttonStyle={ButtonStyle.Clear}
        icon="pen"
        onClick={onEdit}
      />
    </FoodContainerItemRow>
  );
}
