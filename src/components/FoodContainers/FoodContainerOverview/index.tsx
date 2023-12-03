import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FoodContainer } from "../../../types/FoodContainer";
import FoodContainerNutritionInfo from "./FoodContainerNutritionInfo";

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
        "cursor-pointer grid grid-cols-[auto_3fr_1fr] gap-x-2 p-2",
        className
      )}
    >
      <div className="row-span-2 col-start-1 col-span-1 text-3xl items-center justify-center">
        <FontAwesomeIcon icon="box" />
      </div>
      <span className="font-bold text-sm">{foodContainer.name}</span>
      <span className="text-xs col-start-2">{foodContainer.identifier}</span>
      <FoodContainerNutritionInfo foodContainer={foodContainer} />
    </div>
  );
}
