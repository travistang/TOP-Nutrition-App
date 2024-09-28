import classNames from "classnames";
import { FoodContainer } from "../../../types/FoodContainer";
import FoodContainerNutritionInfo from "./FoodContainerNutritionInfo";
import PreparationDateInfo from "./PreparationDateInfo";

type Props = {
  foodContainer: FoodContainer;
  onSelect?: () => void;
  className?: string;
};
export default function FoodContainerOverview({
  onSelect,
  foodContainer,
  className,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={classNames(
        "cursor-pointer grid grid-cols-[minmax(20%,auto)_3fr_1fr] gap-x-2 p-2",
        className
      )}
    >
      <PreparationDateInfo preparationDate={foodContainer.preparationDate} />
      <span className="font-bold text-sm">{foodContainer.name}</span>
      <span className="text-xs col-start-2">{foodContainer.identifier}</span>
      <FoodContainerNutritionInfo foodContainer={foodContainer} />
    </div>
  );
}
